<template>
    <div class="get-comments">
        <div class="item" v-for="comment in commentArr" :key="comment.createdAt">
            <!-- 左边内容：头像 -->
            <div class="left">
                <avatar color="#fff" :src="comment.avatar" :username="comment.username" :inline=false :size=50></avatar>
            </div>
            <!-- 右边内容 -->
            <div class="right">
                <!-- 第一行：姓名、发表日期 -->
                <div>
                    <span class="username">{{comment.username}}</span>
                    <span class="createdAt">发表时间：{{comment.createdAt|dataFormat}}</span>
                </div>
                <!-- 第二行：评论内容 -->
                <div>
                    <a :href="`/topic/${comment.topic_id}#${comment.id}`">{{`${comment.content}...`}}</a>
                </div>
                <!-- 第三行：评论目标 -->
                <div>
                    <span>{{getTargetContent(comment.targetContent,comment.targetCategory)}}</span>
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
      commentArr: ""
    };
  },
  props: ["userId"],
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      if (!this.userId) return;
      try {
        var result = await this.$http.get(`/comment/getCommentByUserId/${this.userId}`);
        if (result.data.code == 200) {
          this.commentArr = result.data.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    getTargetContent(vals, categry) {
      if (categry == "son") {
        return `[ 回复评论 ]：${vals}...`;
      } else {
        return `[ 回复标题 ]：${vals}`;
      }
    }
  },
  components: {
    Avatar
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
  }
};
</script>

<style lang="less" scoped>
.get-comments {
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
