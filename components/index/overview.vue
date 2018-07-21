<template>
  <div class="overview">
    <div class="nav">
      <span>最新</span>
      <span>活动</span>
    </div>
    <ul class="content">
      <li>
        <div class="left">
          <div>
            <avatar username="Hello" :inline=false :size=53></avatar>
          </div>
          <div class="info">
            <router-link to="/" class="title">General Discussion</router-link>
            <div class="bottom">
              <span></span>
              <span>Vue.js</span>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="top">
            <span>0</span>
          </div>
          <div class="bottom">
            <span>7小时前</span>
          </div>
        </div>
      </li>
      <li>
        <div class="left">
          <div>
            <avatar username="Hello" :inline=false :size=53></avatar>
          </div>
          <div class="info">
            <router-link to="/" class="title">General Discussion</router-link>
            <div class="bottom">
              <span></span>
              <span>Vue.js</span>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="top">
            <span>0</span>
          </div>
          <div class="bottom">
            <span>7小时前</span>
          </div>
        </div>
      </li>
      <li>
        <div class="left">
          <div>
            <avatar username="Hello" :inline=false :size=53></avatar>
          </div>
          <div class="info">
            <router-link to="/" class="title">General Discussion</router-link>
            <div class="bottom">
              <span></span>
              <span>Vue.js</span>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="top">
            <span>0</span>
          </div>
          <div class="bottom">
            <span>7小时前</span>
          </div>
        </div>
      </li>
      <li>
        <div class="left">
          <div>
            <avatar username="Hello" :inline=false :size=53></avatar>
          </div>
          <div class="info">
            <router-link to="/" class="title">General Discussion</router-link>
            <div class="bottom">
              <span></span>
              <span>Vue.js</span>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="top">
            <span>0</span>
          </div>
          <div class="bottom">
            <span>7小时前</span>
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
      arr_topics: [
        {
          username: "",
          title: "hello man 啊哈哈~",
          category: "Vue.js",
          comments: 10,
          comment_time: ""
        }
      ]
    };
  },
  components: {
    Avatar
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
    border-left: 4px solid rgb(18, 168, 157);
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
            background-color: yellow;
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
