<template>
  <div class="navtop">
    <nav-tip :isNavTipShow='isNavTipShow' @closeNavTip='closeNavTip'></nav-tip>
    <div class="wrp">
      <img @click="$router.push('/')" class="home-left" src="~/assets/images/logo3.png">
      <div class="home-right">
        <i v-if="!$store.state.user" @click="$router.push('/search')" class="iconfont">&#xe651;</i>
        <div v-if="$store.state.user" class="userinfo">
          <div @click.stop="showTip($event)" class="avaLogin">
            <avatar color="#fff" :size=32 :src='$store.state.user.avatar' :username="$store.state.user.username"></avatar>
          </div>

          <div v-show="isShow" class="tip">
            <div class="item" @click="jump('personal')">
              <span class="iconfont">&#xe622;</span>
              <span>主页</span>
            </div>
            <div class="item" @click="jump('setting')">
              <span class="iconfont">&#xe61e;</span>
              <span>设置</span>
            </div>
            <div class="item" @click="jump('search')">
              <span class="iconfont">&#xe651;</span>
              <span>搜索</span>
            </div>
            <div class="item" @click="jump('quit')">
              <span class="iconfont">&#xe60b;</span>
              <span>退出</span>
            </div>
          </div>
        </div>
        <router-link v-show="!$store.state.user" to="/register" class="register">注册</router-link>
        <a v-show="!$store.state.user" @click.prevent="isNavTipShow=true" class="login">登陆</a>
      </div>
    </div>
  </div>
</template>
<script>
import Avatar from "vue-avatar";
import { removeUserInfo } from "~/assets/js/userinfo_init.js";
import NavTip from "~/components/nav/nav-tip.vue";
export default {
  data() {
    return {
      isNavTipShow: false,
      username: "Hello"
    };
  },
  methods: {
    closeNavTip() {
      this.isNavTipShow = false;
    },
    showTip(event) {
      this.$store.commit("changeIsShow", {
        isTrue: true,
        parentClassName: event.target.parentNode.className
      });
    },
    jump(info) {
      if (info === "quit") {
        removeUserInfo();
        this.$store.commit("changeUser", "");
        this.$router.push("/");
      } else {
        this.$router.push({ name: info });
      }
    }
  },
  computed: {
    isShow: function() {
      return (
        this.$store.state.isShow.isTrue &&
        (this.$store.state.isShow.parentClassName.indexOf("ava") != -1 ||
          this.$store.state.isShow.parentClassName === "userinfo")
      );
    }
  },
  components: {
    Avatar,
    NavTip
  }
};
</script>
<style lang="less" scoped>
.navtop {
  display: flex;
  justify-content: center;
  background-color: #fff;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);
}
.navtop .wrp {
  width: 1100px;
  padding: 20px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .home-left {
    height: 24px;
    cursor: pointer;
  }
  .home-right {
    display: flex;
    align-items: center;
    i {
      color: #b5b0b0;
      font-size: 22px;
      padding-right: 5px;
      cursor: pointer;
    }
    .login,
    .register {
      font-size: 12px;
      color: #fff;
      padding: 4px 10px;
      background-color: #42b983;
      border-radius: 2px;
      cursor: pointer;
      margin-left: 20px;
    }
    .userinfo {
      position: relative;
      display: inline-flex;
      justify-content: space-between;
      .avaLogin {
        cursor: pointer;
      }
      .tip {
        position: absolute;
        top: 40px;
        left: -70px;
        width: 100px;
        height: 134px;
        background-color: #fff;
        box-shadow: 0px 1px 5px 0px #ccc;
        box-sizing: border-box;
        padding: 5px 0px;
        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: rgb(119, 131, 156);
          padding: 5px 20px;
          cursor: pointer;
          span:nth-child(1) {
            margin-top: 2px;
          }
        }
        .item:nth-child(3),
        .item:nth-child(4) {
          span:nth-child(1) {
            font-weight: 600;
          }
        }
        .item:hover {
          background-color: #f6f6f6;
        }
      }
    }
  }
}
</style>
