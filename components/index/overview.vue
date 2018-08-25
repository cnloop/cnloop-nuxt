<template>
  <div class="overview">
    <div class="nav">
      <span>最新</span>
      <span>活动</span>
    </div>
    <ul class="content">
      <li :data-color="topic.category" v-for="topic in arr_topics" :key="topic.id">
        <div class="left">
          <div>
            <avatar color="#fff" :src="topic.avatar" :username="topic.username" :inline=false :size=53></avatar>
          </div>
          <div class="info">
            <a :href="'/topic/'+topic.id" class="title">{{topic.title}}</a>
            <div class="bottom">
              <span :data-color="topic.category" v-colorFilterBackground></span>
              <span>{{topic.category}}</span>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="top">
            <span>{{getCommentResult(topic.result_count)}}</span>
          </div>
          <div class="bottom">
            <span>{{topic.result_time|dataFormat}}</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="more">
      <router-link to="/#">更多</router-link>
    </div>
  </div>
</template>
<script>
import Avatar from "vue-avatar";
export default {
  data() {
    return {
      arr_topics: []
    };
  },
  async created() {
    try {
      var result = await this.$http.get("/topic/show/overview");
      this.arr_topics = result.data.data;
      console.log(result);
      console.dir(this.arr_topics);
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    getCommentResult(val) {
      if (!val) return 0;
      return val;
    }
  },
  components: {
    Avatar
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
    },
    readFormat(value) {
      if (!value) return "";
      value = parseInt(value);
      if (value > 1000) {
        var res = parseInt(value / 1000 * 10) / 10;
        return `${res}K`;
      }
      return value;
    }
  }
};
</script>
<style lang="less" scoped>
.overview {
  width: 532px;
}
.overview .nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 8px;
  span {
    font-size: 14px;
    color: #919191;
  }
}
.overview .content {
  margin-top: 10px;
  border-top: 2px solid rgb(233, 233, 233);
  li {
    display: flex;
    justify-content: space-between;
    padding: 12px 8px;
    border-bottom: 1px solid rgb(233, 233, 233);
    .left {
      width: 430px;
      display: flex;
      align-items: center;
      .info {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          width: 380px;
        }
        .bottom {
          display: flex;
          align-items: center;
          padding-top: 10px;
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
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .right {
      span {
        color: #919191;
      }
      .top {
        span {
          font-size: 16px;
          padding: 0px 2px;
        }
      }
      .bottom {
        padding-top: 10px;
        font-size: 12px;
      }
      .top,
      .bottom {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
.overview .more {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  a {
    font-size: 14px;
    padding: 5px 10px;
    background-color: #e9e9e9;
  }
  a:hover {
    background-color: #adaaaa;
  }
}
</style>
