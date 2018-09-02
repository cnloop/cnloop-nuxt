<template>
    <section class="item-notice">
        <div class="item">
            <!-- 左边内容：头像 -->
            <div class="left">
                <avatar color="#fff" :src="notice.sende_avatar" :username="notice.sender_username" :inline=false :size=50></avatar>
            </div>
            <!-- 右边内容 -->
            <div class="right">
                <!-- 第一行：姓名、发表日期 -->
                <div>
                    <span class="username">{{notice.sender_username}}</span>
                    <span class="createdAt">{{notice.createdAt|dataFormat}}</span>
                </div>
                <!-- 第二行：消息类别 -->
                <div>
                    <a :href="handleGetSkipUrl(notice.type,notice.target_id,notice.topic_id)">{{handleGetNoticeType(notice.type)}}</a>
                </div>
                <!-- 第三行：消息内容 -->
                <div>
                    <span>{{handleGetNoticeContent(notice.type,notice.content)}}</span>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import Avatar from "vue-avatar";
export default {
  props: ["notice"],
  methods: {
    handleGetNoticeType(type) {
      if (type == "like_topic") return "点赞了您的文章";
      if (type == "like_comment") return "点赞了您的评论";
      if (type == "like_comment_son") return "点赞了您的评论";
      if (type == "comment_topic") return "评论了您的文章";
      if (type == "comment_parent_comment") return "评论了您的回复";
      if (type == "topic_collection") return "收藏了您的文章";

    


    },
    handleGetSkipUrl(type, targetId, topicId) {
      if (type == "like_topic") return `/topic?id=${topicId}`;
      if (type == "like_comment") return `/topic?id=${topicId}#${targetId}`;
      if (type == "like_comment_son") return `/topic?id=${topicId}#${targetId}`;
      if (type == "comment_topic") return `/topic?id=${topicId}#${targetId}`;
      if (type == "comment_parent_comment") return `/topic?id=${topicId}#${targetId}`;
      if (type == "topic_collection") return `/topic?id=${topicId}`;

    },
    handleGetNoticeContent(type, content) {
      if (type == "like_topic") return `[ 点赞文章 ]   《${content}》`;
      if (type == "like_comment") return `[ 点赞内容 ]   ${content}...`;
      if (type == "like_comment_son") return `[ 点赞内容 ]   ${content}...`;
      if (type == "comment_topic") return `[ 评论内容 ]   ${content}...`;
      if (type == "comment_parent_comment") return `[ 评论内容 ]   ${content}...`;
      if (type == "topic_collection") return `[ 收藏文章 ]   《${content}》...`;


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
.item-notice {
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

