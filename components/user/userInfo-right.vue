<template>
  <div class="userInfo-right">
    <!-- 顶部导航 -->
    <div class="top-ava">
      <div @click="changeShowTarget('topics')" :class="{focusTarget:'topics'==showTarget}">
        <span>Topics</span>
        <span>{{userAllCount.topicsCount}}</span>
      </div>
      <div @click="changeShowTarget('comments')" :class="{focusTarget:'comments'==showTarget}">
        <span>Comments</span>
        <span>{{userAllCount.commentsCount}}</span>
      </div>
      <div @click="changeShowTarget('stars')" :class="{focusTarget:'stars'==showTarget}">
        <span>Stars</span>
        <span>{{userAllCount.topics_collectionCount}}</span>
      </div>
      <div @click="changeShowTarget('followers')" :class="{focusTarget:'followers'==showTarget}">
        <span>Followers</span>
        <span>{{userAllCount.fansCount}}</span>
      </div>
      <div @click="changeShowTarget('following')" :class="{focusTarget:'following'==showTarget}">
        <span>Following</span>
        <span>{{userAllCount.followingCount}}</span>
      </div>
    </div>
    <!-- 展示窗口 -->
    <div class="show-window">
      <get-topics v-if="'topics'==showTarget" :userId="userId"></get-topics>
      <get-comments v-else-if="'comments'==showTarget" :userId="userId"></get-comments>
      <get-stars v-else-if="'stars'==showTarget" :userId="userId"></get-stars>
      <get-followers v-else-if="'followers'==showTarget" :userId="userId"></get-followers>
      <get-following v-else-if="'following'==showTarget" :userId="userId"></get-following>
    </div>
  </div>
</template>
<script>
import Avatar from "vue-avatar";
import GetTopics from "~/components/user/get-topics";
import GetComments from "~/components/user/get-comments";
import GetStars from "~/components/user/get-stars";
import GetFollowers from "~/components/user/get-followers";
import GetFollowing from "~/components/user/get-following";

export default {
  data() {
    return {
      userId: "",
      showTarget: "topics",
      userAllCount: ""
    };
  },
  created() {
    this.getUserId();
    this.loadData();
  },
  methods: {
    getUserId() {
      this.userId = this.$route.query.id;
    },
    async loadData() {
      try {
        var result = await this.$http.get(
          `/user/getAllCountById/${this.userId}`
        );
        this.userAllCount = result.data.data;
      } catch (err) {
        console.error("Local app is crash...");
      }
    },
    changeShowTarget(val) {
      this.showTarget = val;
    }
  },
  components: {
    Avatar,
    GetTopics,
    GetComments,
    GetStars,
    GetFollowers,
    GetFollowing
  }
};
</script>
<style lang="less" scoped>
.userInfo-right {
  width: 100%;
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  .top-ava {
    display: flex;
    border-bottom: solid 1px #d1d5da;
    div {
      margin-bottom: -1px;
      padding: 20px;
      color: #586069;
      cursor: pointer;
      margin-right: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      span:nth-child(2) {
        margin-left: 12px;
        font-size: 13px;
        font-weight: 600;
        color: #586069;
        background-color: rgba(27, 31, 35, 0.08);
        padding: 1.5px 6px;
        border-radius: 8px;
      }
    }
    .focusTarget {
      font-weight: 700;
      color: #333;
      border-bottom: 2px solid #e36209;
    }
    div:nth-child(1) {
      padding-left: 8px;
    }
  }
}
</style>

