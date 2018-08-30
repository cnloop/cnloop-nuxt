<template>
    <div class="category">
        <div class="nav">
            <span>分类</span>
            <span>主题</span>
        </div>
        <ul class="content">
            <li>
                <div class="left">
                    <router-link to="/">General Discussion</router-link>
                    <span>不需要分类或者不适合放在现在的任何分类中的主题</span>
                </div>
                <div class="right">
                    <div class="top">
                        <span>{{handleWeekCount("General Discussion")}}</span>
                        <span>/</span>
                        <span>周</span>
                    </div>
                    <div class="bottom">
                        <span>{{handleRecentCount("General Discussion")}}</span>
                        <span>近期</span>
                    </div>
                </div>
            </li>
            <li>
                <div class="left">
                    <router-link to="/">Get Help</router-link>
                    <span>Got stuck? Get help from other users here. Better yet, help others out once you leveled up your own skills!</span>
                </div>
                <div class="right">
                    <div class="top">
                        <span>{{handleWeekCount("Get Help")}}</span>
                        <span>/</span>
                        <span>周</span>
                    </div>
                    <div class="bottom">
                        <span>{{handleRecentCount("Get Help")}}</span>
                        <span>近期</span>
                    </div>
                </div>
            </li>
            <li>
                <div class="left">
                    <router-link to="/">Show & Vue.js</router-link>
                    <span>Show your cool stuff! Anything built with or related to Vue.js goes.</span>
                </div>
                <div class="right">
                    <div class="top">
                        <span>{{handleWeekCount("Show & Vue.js")}}</span>
                        <span>/</span>
                        <span>周</span>
                    </div>
                    <div class="bottom">
                        <span>{{handleRecentCount("Show & Vue.js")}}</span>
                        <span>近期</span>
                    </div>
                </div>
            </li>
            <li>
                <div class="left">
                    <router-link to="/">Show & CSS</router-link>
                    <span>Show your cool stuff! Anything built with or related to CSS goes.</span>
                </div>
                <div class="right">
                    <div class="top">
                        <span>{{handleWeekCount("Show & CSS")}}</span>
                        <span>/</span>
                        <span>周</span>
                    </div>
                    <div class="bottom">
                        <span>{{handleRecentCount("Show & CSS")}}</span>
                        <span>近期</span>
                    </div>
                </div>
            </li>
            <li>
                <div class="left">
                    <router-link to="/">Show & JS</router-link>
                    <span>Show your cool stuff! Anything built with or related to JS goes.</span>
                </div>
                <div class="right">
                    <div class="top">
                        <span>{{handleWeekCount("Show & JS")}}</span>
                        <span>/</span>
                        <span>周</span>
                    </div>
                    <div class="bottom">
                        <span>{{handleRecentCount("Show & js")}}</span>
                        <span>近期</span>
                    </div>
                </div>
            </li>
            <li>
                <div class="left">
                    <router-link to="/">Show & Node.js</router-link>
                    <span>Show your cool stuff! Anything built with or related to Node.js goes.</span>
                </div>
                <div class="right">
                    <div class="top">
                        <span>{{handleWeekCount("Show & Node.js")}}</span>
                        <span>/</span>
                        <span>周</span>
                    </div>
                    <div class="bottom">
                        <span>{{handleRecentCount("Show & Node.js")}}</span>
                        <span>近期</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  data() {
    return {
      weekCount: "",
      recentCount: ""
    };
  },
  created() {
    this.loadWeekCount();
    this.loadRecentCount();
  },
  methods: {
    async loadWeekCount() {
      try {
        var result = await this.$http.get("/topic/getCategoryWeekCount");
        this.weekCount = result.data.data;
      } catch (err) {
        console.error("Local app is crash...");
      }
    },
    async loadRecentCount() {
      try {
        var result = await this.$http.get("/topic/getCategoryRecentCount");
        this.recentCount = result.data.data;
      } catch (err) {
        console.error("Local app is crash...");
      }
    },
    handleWeekCount(category) {
      var count = 0;
      if (!this.weekCount) return;
      this.weekCount.forEach(ele => {
        if (ele.category == category) {
          count = ele.WeekCount;
        }
      });
      return count;
    },
    handleRecentCount(category) {
      var count = 0;
      if (!this.recentCount) return;
      this.recentCount.forEach(ele => {
        if (ele.category == category) {
          count = ele.recentCount;
        }
      });
      console.log(count);
      return count;
    }
  }
};
</script>
<style lang="less" scoped>
.category {
  width: 532px;
}
.category .nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 8px;
  span {
    font-size: 14px;
    color: #919191;
  }
}
.category .content {
  margin-top: 10px;
  border-top: 2px solid rgb(233, 233, 233);
  li {
    display: flex;
    justify-content: space-between;
    padding: 12px 8px;
    border-left: 4px solid rgb(18, 168, 157);
    border-bottom: 1px solid rgb(233, 233, 233);
    .left,
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .left {
      width: 430px;
      a {
        font-size: 18px;
        font-weight: bold;
      }
      span {
        color: #919191;
        font-size: 14px;
      }
      span {
        padding-top: 10px;
      }
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
        span:last-child {
          padding: 0px;
        }
      }
      .bottom {
        padding-top: 10px;
        font-size: 12px;
        span:last-child {
          padding-left: 4px;
        }
      }
      .top,
      .bottom {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
  li:nth-child(2) {
    border-left: 4px solid rgb(101, 45, 144);
  }
  li:nth-child(3) {
    border-left: 4px solid rgb(247, 148, 29);
  }
  li:nth-child(4) {
    border-left: 4px solid rgb(191, 30, 46);
  }
  li:nth-child(5) {
    border-left: 4px solid rgb(179, 181, 180);
  }
  li:nth-child(6) {
    border-left: 4px solid rgb(37, 170, 226);
  }
}
</style>
