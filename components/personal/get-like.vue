<template>
  <div class="get-like">
    <div class="item" v-for="like in likeArr" :key="like.createdAt">
      <!-- 左边内容：头像 -->
      <div class="left">
        <avatar color="#fff" :src="like.avatar" :username="like.username" :inline=false :size=50></avatar>
      </div>
      <!-- 右边内容 -->
      <div class="right">
        <!-- 第一行：姓名、发表日期 -->
        <div>
          <span class="username">{{like.username}}</span>
          <span class="createdAt">{{like.createdAt|dataFormat}}</span>
        </div>
        <!-- 第二行：评论内容 -->
        <div>
          <a @click.prevent="SkipToTarget(like.topic_id,like.topic_content,like.comment_id,like.comment_content,like.comment_son_id,like.comment_son_id_content,like.targetId)">{{likeContent(like.topic_id,like.topic_content,like.comment_id,like.comment_content,like.comment_son_id,like.comment_son_id_content)}}</a>
        </div>
        <!-- 第三行：评论目标 -->
        <div>
          <span>{{likeType(like.topic_id,like.topic_content,like.comment_id,like.comment_content,like.comment_son_id,like.comment_son_id_content)}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Avatar from "vue-avatar";

export default {
  data() {
    return {
      likeArr: ""
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      try {
        var result = await this.$http.get("/like/getLikeListByLoad");
        if (result.data.code == 200) {
          this.likeArr = result.data.data;
          console.log(this.likeArr);
        } else {
          console.warn("you are not like anyone...");
        }
      } catch (err) {
        console.error("Local app crash...");
      }
    },
    likeContent(t_id, t_content, c_id, c_content, cs_id, cs_content) {
      if (t_id != "%empty%") {
        return `${t_content}...`;
      } else if (c_id != "%empty%") {
        return `${c_content}..`;
      } else {
        return `${cs_content}..`;
      }
    },
    likeType(t_id, t_content, c_id, c_content, cs_id, cs_content) {
      if (t_id != "%empty%") {
        return "[ 点赞了文章 ]";
      }
      if (c_id != "%empty%") {
        return "[ 点赞了评论 ]";
      }
      if (cs_id != "%empty%") {
        return "[ 点赞了子评论 ]";
      }
    },
    SkipToTarget(
      t_id,
      t_content,
      c_id,
      c_content,
      cs_id,
      cs_content,
      targetId
    ) {
      if (t_id != "%empty%") {
        this.$router.push(`/topic?id=${t_id}`);
      }
      if (c_id != "%empty%") {
        this.$router.push(`/topic?id=${targetId}#${c_id}`);
      }
      if (cs_id != "%empty%") {
        this.$router.push(`/topic?id=${targetId}#${cs_id}`);
      }
    }
  },
  filters: {
    dataFormat(value) {
      if (!value) return "";
      var y = new Date(value).getFullYear();
      var m = new Date(value).getMonth() + 1;
      var d = new Date(value).getDate();
      value = parseInt(value);
      var dateDiff = new Date().getTime() - value;
      var oneYear = 365 * 24 * 3600 * 1000;
      var oneMonth = 30 * 24 * 3600 * 1000;
      var oneDay = 24 * 3600 * 1000;
      var oneHour = 3600 * 1000;
      var oneMin = 60 * 1000;
      if (dateDiff / oneYear >= 1) {
        return `${y}年${m}月${d}日`;
      } else if (dateDiff / oneMonth >= 1) {
        return `${m}月${d}日`;
      } else if (dateDiff / oneDay >= 1) {
        return `${Math.floor(dateDiff / oneDay)}天前`;
      } else if (dateDiff / oneHour >= 1) {
        return `${Math.floor(dateDiff / oneHour)}小时前`;
      } else if (dateDiff / oneMin >= 1) {
        return `${Math.floor(dateDiff / oneMin)}分钟前`;
      } else {
        return "刚刚";
      }
    }
  },
  components: {
    Avatar
  }
};
</script>
<style lang="less" scoped>
.get-like {
  .item {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px #e1e4e8 solid;
    padding: 20px 0px;
    .right {
      width: 100%;
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      div:nth-child(1) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .username {
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
        }
        .username:hover {
          color: #2faee3;
        }
        .createdAt {
          color: #999;
          font-size: 12px;
        }
      }
      div:nth-child(2) {
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-top: 10px;
        a {
          line-height: 28px;
          color: #0097d0;
        }
      }
      div:nth-child(3) {
        margin-top: 12px;
        background-color: #f4f4f4;
        padding: 4px 2px;
        display: flex;
        align-items: center;
        span {
          line-height: 18px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
