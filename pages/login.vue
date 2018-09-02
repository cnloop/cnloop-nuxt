<template>
  <div class="login">
    <div class="login-wrp">
      <div class="login-main">
        <div class="email">
          <span>邮箱</span>
          <input type="text" placeholder="Email" v-model="email">
        </div>
        <div class="password">
          <div class="title">
            <span>密码</span>
            <nuxt-link to="/resetpwd">忘记密码？</nuxt-link>
          </div>
          <input type="password" placeholder="Password" v-model="password">
        </div>
        <div class="btnLogin">
          <a href="" @click.prevent="login" v-show="isLogin">登陆</a>
          <div class="modal" v-show="isModal">
            <spinner :status="spinner.status" :color="spinner.color" :size="spinner.size" :depth="spinner.depth" :rotation="spinner.rotation" :speed="spinner.speed"></spinner>
            <span>正在登陆中...</span>
          </div>
        </div>
      </div>
      <div class="login-register">
        没有账号？
        <nuxt-link :to="{name:'register'}">点击注册</nuxt-link>
      </div>
      <transition name="alertMsg">
        <div class="register-alertMsg" v-show="alertMsg">
          <span>{{alertMsg}}</span>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import Spinner from "~/components/common/Spinner";
import { saveUserInfo } from "~/assets/js/userinfo_init.js";

export default {
  data() {
    return {
      alertMsg: "",
      password: "",
      email: "",
      isLogin: true,
      isModal: false,
      spinner: {
        size: 15,
        status: true,
        color: "#caded5",
        depth: 2,
        rotation: true,
        speed: 0.8
      }
    };
  },
  methods: {
    trim(str) {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    emailReg() {
      return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    },
    async login() {
      if (!this.email) return (this.alertMsg = "邮箱不能为空");
      if (!this.emailReg().test(this.trim(this.email))) {
        this.alertMsg = "邮箱格式不正确";
        return;
      }
      if (!this.password) return (this.alertMsg = "密码不能为空");
      this.isLogin = false;
      this.isModal = true;
      try {
        var result = await this.$http.post("/login", {
          email: this.email,
          password: this.password
        });
        this.isLogin = true;
        this.isModal = false;
        if (result.data.code === 200) {
          saveUserInfo(result.data.data);
          this.$store.commit("changeUser", result.data.data.user);
          this.$router.push("/");
        } else {
          this.alertMsg = result.data.msg;
        }
      } catch (err) {
        this.isLogin = true;
        this.isModal = false;
        this.alertMsg = "网络错误！";
      }
    }
  },
  components: {
    Spinner
  }
};
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
}

.login-wrp {
  margin-top: 120px;
}
.login-main {
  box-shadow: 0px 0px 2px #ccc;
  width: 358px;
  height: 235px;
  border: 1px solid #d8dee2;
  border-radius: 5px;
  padding: 20px;
  .email,
  .password {
    width: 100%;
    display: flex;
    flex-direction: column;
    span {
      font-size: 14px;
      font-weight: bold;
    }
    input {
      margin-top: 12px;
      margin-bottom: 12px;
      height: 34px;
      font-size: 14px;
      color: rgb(85, 85, 85);
      background-color: rgb(255, 255, 255);
      border-width: 1px;
      border-style: solid;
      border-color: rgb(204, 204, 204);
      border-radius: 4px;
      padding-left: 5px;
    }
    input:focus {
      box-shadow: rgba(0, 0, 0, 0.075) 0px 0px 25px;
    }
  }

  .password {
    .title {
      display: flex;
      justify-content: space-between;
      a {
        font-size: 14px;
        color: rgb(51, 122, 183);
      }
    }
  }

  .btnLogin {
    margin-top: 20px;
    width: 100%;
    height: 36px;
    background-color: #319bef;
    border-radius: 2px;
    display: flex;
    align-items: center;
    a {
      width: 100%;
      height: 100%;
      color: #fff;
      line-height: 36px;
      text-align: center;
    }
    .modal {
      width: 100%;
      height: 100%;
      background-color: #2f89d1;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        // color: #83b4e6;
        color: #fff;
        font-size: 14px;
        margin-left: 5px;
      }
    }
  }
  .btnLogin:active {
    background-color: #2f89d1;
  }
}

.login-register {
  box-shadow: 0px 0px 2px #ccc;
  margin-top: 20px;
  width: 358px;
  padding: 10px 20px;
  border: 1px solid #a5acb1;
  border-radius: 2px;
  a {
    color: #337ab7;
  }
}

.register-alertMsg {
  margin-top: 15px;
  width: 358px;
  padding: 0px 21px;
  height: 40px;
  color: #f56c6c;
  background-color: #fef0f0;
  border-radius: 4px;
  font-size: 14px;
  display: flex;
  align-items: center;
  letter-spacing: 1px;
}
.alertMsg-enter-active,
.alertMsg-leave-active {
  transition: opacity 0.5s;
}
.alertMsg-enter,
.alertMsg-leave-to {
  opacity: 0;
}
</style>

