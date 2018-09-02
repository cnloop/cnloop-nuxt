<template>
  <div class="get-topics">
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
        <div class="time">修改时间：{{topic.updatedAt|dataFormat}}</div>
      </div>
    </div>
    <no-ssr>
      <paginate v-if="pageCount" v-model="pageIndex" :page-count="pageCount" :page-range="3" :margin-pages="2" :click-handler="clickCallback" :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'" :page-link-class="'page-link'" :prev-link-class="'prev-link'" :next-link-class="'next-link'" :active-class="'activeEle'">
      </paginate>
    </no-ssr>
  </div>
</template>
<script>
export default {
  data() {
    return {
      topicsArr: "",
      pageIndex: 1,
      pageCount: 1
    };
  },
  props: ["userId"],
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      try {
        if (!this.userId) return;
        var result = await this.$http.get(
          `/topic/getTopicByUserId/${this.userId}`
        );
        if (result.data.code == 200) {
          this.topicsArr = result.data.data.topics;
          this.pageCount = result.data.data.pageCount;
        } else {
          this.pageCount = 0;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async clickCallback(pageNum) {
      try {
        var result = await this.$http.get(
          `/topic/getTopicByUserId/${this.userId}?pageIndex=${pageNum}`
        );
        if (result.data.code == 200) {
          this.topicsArr = result.data.data.topics;
          this.pageCount = result.data.data.pageCount;
          document.body.scrollTop = document.documentElement.scrollTop = 0;
        } else {
          this.pageCount = 0;
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
<style lang="less">
.get-topics {
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
  .pagination {
    margin-top: 50px;
    margin-bottom: 50px;
    display: inline-flex;
    align-items: center;
    border: 1px solid #ddd;
    .page-link {
      box-sizing: border-box;
      display: flex;
      padding: 6px 10px;
      border-right: 1px solid #ddd;
    }
    .page-link:first-child {
      border-left: 1px solid #ddd;
    }
    .prev-link {
      height: 100%;
      padding: 6px 10px;
    }
    .next-link {
      padding: 6px 10px;
    }
    .activeEle {
      border: 1px solid rgb(77, 144, 254);
    }
  }
}
</style>

