<template>
  <div class="pretopic">
    <h2>文章</h2>
    <div class="item" v-for="topic in topicsArr" :key="topic.id">
      <!-- 标题 -->
      <a :href="'/topic?id='+topic.id" class="title">{{topic.title}}</a>
      <div class="bottom">
        <!-- 分类 -->
        <div class="category">
          <span :data-color="topic.category" v-colorFilterBackground></span>
          <span>{{topic.category}}</span>
        </div>
        <!-- 修改时间 -->
        <div class="time">{{topic.updatedAt|dataFormat}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      topicsArr: ""
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      try {
        var result = await this.$http.get("/topic/getTopicByDefaultUserId");
        if (result.data.code == 200) {
          this.topicsArr = result.data.data;
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  directives: {
    colorFilterLine: {
      inserted: function(el) {
        var value = el.dataset.color;
        if (!value) return "";
        if (value === "General Discussion")
          return (el.style.borderLeft = "4px solid rgb(18, 168, 157)");
        if (value == "Get Help")
          return (el.style.borderLeft = "4px solid rgb(101, 45, 144)");
        if (value == "Show & Vue.js")
          return (el.style.borderLeft = "4px solid rgb(247, 148, 29)");
        if (value == "Show & CSS")
          return (el.style.borderLeft = "4px solid rgb(191, 30, 46)");
        if (value == "Show & JS")
          return (el.style.borderLeft = "4px solid rgb(179, 181, 180)");
        if (value == "Show & Node.js")
          return (el.style.borderLeft = "4px solid rgb(37, 170, 226)");
      }
    },
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
  }
};
</script>

<style lang="less" scoped>
.pretopic {
  h2 {
    padding-bottom: 8px;
    font-weight: 400;
    margin-top: -5px;
    letter-spacing: 2px;
    border-bottom: 1px #e1e4e8 solid;
  }
  // 每一篇文章
  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: 1px #e1e4e8 solid;
    padding: 20px 0px;
    // 标题
    .title {
      font-size: 18px;
      color: #0366d6;
    }
    // 分类、时间
    .bottom {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      // 分类
      .category {
        display: flex;
        align-items: center;
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
      // 时间
      .time {
        color: #919191;
        font-size: 12px;
      }
    }
  }
}
</style>
