<template>
  <div class="topic">
    <div class="wrp">
      <reply v-show="replyShow" :topicObj="topicObj" @closeReply='closeReply'></reply>
      <div class="main">
        <!-- title -->
        <h1 class="title">{{topicObj.title}}</h1>
        <!-- category -->
        <div class="category-button">
          <span :data-color="topicObj.category" v-colorFilterBackground></span>
          <span>{{topicObj.category}}</span>
        </div>
        <!-- topic -->
        <div class="mian-content">
          <!-- avatar -->
          <div class="left">
            <avatar color="#fff" :src="topicObj.avatar" :username="topicObj.username" :inline=false :size=43></avatar>
          </div>
          <div class="right">
            <div class="top">
              <div class="user-name">{{topicObj.username}}</div>
              <span>{{topicObj.createdAt|dataFormat}}</span>
            </div>
            <no-ssr>
              <preview class="preview" :previewContent='topicObj.content'></preview>
            </no-ssr>
            <div class="bottom">
              <div v-if="$store.state.user.id&&$store.state.user.id==topicObj.user_id">
                <span class="iconfont">&#xe612;</span>
                <span>delete</span>
              </div>
              <div v-if="$store.state.user.id&&$store.state.user.id==topicObj.user_id">
                <span class="iconfont">&#xe738;</span>
                <span>update</span>
              </div>
              <div>
                <span class="iconfont">&#xe62e;</span>
                <span></span>
              </div>
              <div>
                <span class="iconfont">&#xe62a;</span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
        <!-- comment -->
        <comment-content :topicId="$route.params.id"></comment-content>
        <!-- reply button -->
        <div class="reply"  v-if="$store.state.user">
          <div class="wrp" @click="replyShow=true">
            <span class="iconfont">&#xe61a;</span>
            <span>Reply</span>
          </div>
        </div>

        <h1 style="padding:100px"></h1>
      </div>
    </div>
  </div>
</template>
<script>
import Avatar from "vue-avatar";
import Reply from "~/components/topic/reply";
import CommentContent from "~/components/topic/comment-content";
export default {
  data() {
    return {
      topicObj: {
        id: "",
        browsed: 1,
        category: "General Discussion",
        title: "",
        content: "",
        createdAt: "",
        user_id: "",
        username: "",
        avatar: "",
        like_user_id: "",
        collection_user_id: ""
      },
      replyShow: false
    };
  },
  methods: {
    closeReply() {
      this.replyShow = false;
    }
  },
  async created() {
    var { id } = this.$route.params;
    try {
      var result = await this.$http.get(`/topic/${id}`);
      this.topicObj = result.data.data;
    } catch (err) {
      console.log(err);
    }
  },
  directives: {
    colorFilterBackground: {
      inserted: function(el) {
        var value = el.dataset.color;
        if (!value) return "";
        if (value === "General Discussion")
          return (el.style.backgroundColor = "rgb(18, 168, 157)");
        if (value == "Get Help")
          return (el.style.backgroundColor = "rgb(101, 45, 144)");
        if (value == "Show & Vue.js")
          return (el.style.backgroundColor = "rgb(247, 148, 29)");
        if (value == "Show & CSS")
          return (el.style.backgroundColor = "rgb(191, 30, 46)");
        if (value == "Show & JS")
          return (el.style.backgroundColor = "rgb(179, 181, 180)");
        if (value == "Show & Node.js")
          return (el.style.backgroundColor = "rgb(37, 170, 226)");
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
    preview: () => import("~/components/topic/content"),
    Avatar,
    Reply,
    CommentContent
  }
};
</script>
<style lang="less" scoped>
.topic {
  display: flex;
  justify-content: center;
}
.topic .wrp {
  width: 1100px;
}

.topic .wrp .main {
  width: 855px;
  margin-top: 30px;
  .title {
    font-size: 25px;
  }
  .category-button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 14px;
    padding-bottom: 5px;
    span:first-child {
      font-size: 16px;
      color: #8b8ba2;
      width: 8px;
      height: 8px;
    }
    span:last-child {
      font-size: 12px;
      font-weight: bold;
      margin-left: 10px;
    }
  }
  .mian-content {
    margin-top: 10px;
    padding-bottom: 20px;
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    display: flex;
    justify-content: space-between;
    padding-top: 15px;
    .right {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-left: 14px;
      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #bdbdbd;
        font-size: 12px;
        .user-name {
          font-weight: 600;
        }
      }
      .preview {
        margin-top: 14px;
      }
      .bottom {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        span {
          font-size: 20px;
          color: #c1c1c1;
        }
        div {
          margin-right: 20px;
          cursor: pointer;
          span:nth-child(1) {
            margin-right: 5px;
          }
          span:nth-child(2) {
            font-size: 12px;
          }
        }
        div:last-child {
          margin-right: 0px;
        }
      }
    }
  }
  .reply {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .wrp {
      width: 78px;
      border-radius: 2px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #42b983;
      cursor: pointer;
      padding: 4px 5px;
      span {
        font-size: 20px;
        color: #fff;
      }
    }
  }
}
</style>
