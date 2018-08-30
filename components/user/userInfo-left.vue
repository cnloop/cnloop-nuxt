<template>
  <div class="userInfo-left">
    <!-- 头像 -->
    <div>
      <avatar color="#fff" :customStyle="customStyle" :src="userInfo.avatar" :username="userInfo.username" :rounded='false' :inline=false :size=230></avatar>
    </div>
    <!-- 用户名、昵称 -->
    <div>
      <span class="username">{{userInfo.username}}</span>
      <span class="nickname">{{userInfo.nickname}}</span>
    </div>
    <!-- 名言警句 -->
    <div>
      <span class="motto">{{userInfo.motto?userInfo.motto:'世界本没有路，人走的多了...'}}</span>
    </div>
    <!-- 关注 -->
    <div @click="changeFollowingState">
      <span class="follow">{{followStatus}}</span>
    </div>
    <!-- 邮箱 -->
    <div>
      <span class="email-icon iconfont">&#xe65b;</span>
      <span class="email-value">{{showEmail(userInfo.email,userInfo.github_email)}}</span>
    </div>
  </div>
</template>
<script>
import Avatar from "vue-avatar";
export default {
  data() {
    return {
      userId: "",
      isLoading: "",
      userInfo: {
        avatar: "",
        username: ""
      },
      followStatus: "Follow",
      customStyle: {
        borderRadius: "8px"
      }
    };
  },
  created() {
    this.getUserInfo();
    this.checkIsFollowing();
  },
  methods: {
    async getUserInfo() {
      this.userId = this.$route.query.id;
      try {
        var result = await this.$http.get(
          `/user/getUserInfoByUserId/${this.userId}`
        );
        if (result.data.code == 200) {
          this.userInfo = result.data.data;
        }
      } catch (err) {
        console.log(err);
      }
    },

    async checkIsFollowing() {
      var result = await this.$http.get(`/follow/getFollowingList`);
      if (result.data.code == 200) {
        var flag = 0;
        result.data.data.forEach(ele => {
          if (ele) {
            if (ele.following_user_id == this.$route.query.id) {
              return (flag = 1);
            }
          }
        });
        if (flag == 0) {
          this.followStatus = "Follow";
        } else {
          this.followStatus = "Unfollow";
        }
      } else {
        this.followStatus = "Follow";
      }
    },
    async changeFollowingState() {
      try {
        var result = await this.$http.post("/follow", {
          following_user_id: this.$route.query.id
        });
        if (result.data.code == 200) {
          this.checkIsFollowing();
        }
      } catch (err) {
        console.log(err);
      }
    },
    showEmail(v1, v2) {
      if (v1) return v1;
      return v2;
    }
  },
  components: {
    Avatar
  }
};
</script>
<style lang="less" scoped>
.userInfo-left {
  width: 230px;
  display: flex;
  flex-direction: column;
  // 用户名、昵称
  div:nth-child(2) {
    margin-top: 18px;
    display: flex;
    flex-direction: column;
    span:nth-child(1) {
      font-size: 20px;
      font-weight: 600;
    }
    span:nth-child(2) {
      margin-top: 2px;
      font-size: 16px;
      color: #6a737d;
    }
  }
  // 名言警句
  div:nth-child(3) {
    margin-top: 15px;
    font-size: 14px;
    color: #6a737d;
  }
  // 关注
  div:nth-child(4) {
    margin-top: 15px;
    height: 30px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    background-color: #e9ecef;
    border-radius: 2px;
    border: 1px solid rgba(118, 124, 130, 0.35);
  }
  // 邮箱
  div:nth-child(5) {
    padding-top: 20px;
    border-top: 1px solid #eaecef;
    margin-top: 35px;
    display: flex;
    align-items: center;
    .email-icon {
      font-size: 18px;
      margin-bottom: 1px;
    }
    .email-value {
      margin-left: 14px;
      font-size: 15px;
      color: #0366d6;
    }
  }
}
</style>
