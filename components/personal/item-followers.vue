<template>
  <div class="item-follower">
    <div class="item">
      <!-- 头像、用户名、昵称 -->
      <div class="left">
        <!-- 头像 -->
        <div>
          <avatar :customStyle="customStyle" v-clickSkipUrl="{user_id:followers.user_id}" :src="followers.avatar" :username="followers.username" color="#fff" :inline=false :size=50></avatar>
        </div>
        <!-- 昵称 -->
        <div>
          <span @click="seeUserInfo(followers.user_id)">{{followers.username}}</span>
          <span @click="seeUserInfo(followers.user_id)">{{followers.nickname?followers.nickname:followers.username}}</span>
        </div>
      </div>
      <!-- 关注按钮 -->
      <div class="right">
        <div class="follow">
          <span @click="changeFollowingStatus(followers.user_id)">{{isFollow(followers.user_id,youSelfFollowingArr)?"UnFollow":"Follow"}}</span>
        </div>

      </div>
      <!-- 插入个人信息显示卡片 -->
      <div v-show="isShowUserInfoCard" class="userInfoCard">
        <div class="left">
          <avatar :customStyle="customStyle" :src="followers.avatar" :username="followers.username" color="#fff" :inline=false :size=50></avatar>
        </div>
        <div class="right">
          <span>{{followers.username}}</span>
          <span>{{followers.nickname?followers.nickname:followers.username}}</span>
        </div>
        <div class="triangle_down">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Avatar from "vue-avatar";
export default {
  props: ["followers", "youSelfFollowingArr"],
  data() {
    return {
      customStyle: {
        cursor: "pointer"
      },
      isShowUserInfoCard: false
    };
  },
  methods: {
    async changeFollowingStatus(following_user_id) {
      try {
        var result = await this.$http.post("/follow", {
          following_user_id
        });
        if (result.data.code == 200) {
          this.$emit("loadYouFollwing");
        }
      } catch (err) {
        next(err);
      }
    },
    seeUserInfo(user_id) {
      window.location.href = `/userInfo?id=${user_id}`;
    },
    isFollow(userId, userIdArr) {
      var flag = false;
      userIdArr.forEach(ele => {
        if (userId == ele) {
          return (flag = true);
        }
      });
      return flag;
    }
  },
  directives: {
    clickSkipUrl: {
      inserted: function(el, binding, vnode) {
        el.onclick = function() {
          window.location.href = `/userInfo?id=${binding.value.user_id}`;
        };
        el.onmouseover = function() {
          vnode.context.isShowUserInfoCard = true;
        };
        el.onmouseleave = function() {
          vnode.context.isShowUserInfoCard = false;
        };
      }
    }
  },
  components: {
    Avatar
  }
};
</script>
<style lang="less" scoped>
.item-follower {
  .item {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 20px 0px;
    border-bottom: 1px #e1e4e8 solid;
    .left {
      display: flex;
      // 头像
      // ...
      // 用户名、昵称
      div:nth-child(2) {
        margin-left: 20px;
        display: flex;
        align-items: baseline;
        span:nth-child(1) {
          font-size: 17px;
          cursor: pointer;
        }
        span:nth-child(2) {
          margin-left: 10px;
          color: #586069;
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
      // 关注按钮
      .follow {
        width: 100px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        display: flex;
        cursor: pointer;
        background-color: #e9ecef;
        border-radius: 2px;
        border: 1px solid rgba(118, 124, 130, 0.35);
      }
    }
    .userInfoCard {
      position: absolute;
      left: -5px;
      top: -90px;
      display: flex;
      width: 200px;
      padding: 20px 10px;
      padding-right: 150px;
      border: 1px solid #d1d5da;
      border-radius: 5px;
      background-color: #fff;
      .right {
        margin-left: 10px;
        display: flex;
        align-items: baseline;
        span:nth-child(1) {
          font-size: 17px;
          cursor: pointer;
        }
        span:nth-child(2) {
          margin-left: 10px;
          color: #586069;
          font-size: 14px;
          cursor: pointer;
        }
      }
      .triangle_down {
        position: absolute;
        bottom: -7px;
        left: 18px;
        width: 12px;
        height: 12px;
        background-color: #fff;
        border-bottom: 1px solid #d1d5da;
        border-right: 1px solid #d1d5da;
        transform: rotate(45deg);
      }
    }
  }
}
</style>
