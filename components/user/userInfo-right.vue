<template>
  <div class="userInfo-right">
    <!-- 顶部导航 -->
    <div class="top-ava">
      <div @click="changeShowTarget('topics')" :class="{focusTarget:'topics'==showTarget}">
        <span>Topics</span>
        <span>80</span>
      </div>
      <div @click="changeShowTarget('comments')" :class="{focusTarget:'comments'==showTarget}">
        <span>Comments</span>
        <span>80</span>
      </div>
      <div @click="changeShowTarget('stars')" :class="{focusTarget:'stars'==showTarget}">
        <span>Stars</span>
        <span>80</span>
      </div>
      <div @click="changeShowTarget('followers')" :class="{focusTarget:'followers'==showTarget}">
        <span>Followers</span>
        <span>80</span>
      </div>
      <div @click="changeShowTarget('following')" :class="{focusTarget:'following'==showTarget}">
        <span>Following</span>
        <span>80</span>
      </div>
    </div>
    <!-- 展示窗口 -->
    <div class="show-window">
      <get-topics v-if="'topics'==showTarget" :userId="userId"></get-topics>
      <get-comments v-else-if="'comments'==showTarget" :userId="userId"></get-comments>
      <get-stars v-else-if="'stars'==showTarget" :userId="userId"></get-stars>
      <get-followers v-else-if="'followers'==showTarget" :userId="userId"></get-followers>
    </div>
  </div>
</template>
<script>
import Avatar from "vue-avatar";
import GetTopics from "~/components/user/get-topics";
import GetComments from "~/components/user/get-comments";
import GetStars from "~/components/user/get-stars";
import GetFollowers from "~/components/user/get-followers";

export default {
  data() {
    return {
      userId: "",
      showTarget: "topics"
    };
  },
  created() {
    this.getUserId();
  },
  methods: {
    getUserId() {
      this.userId = this.$route.params.id;
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
    GetFollowers
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

