<template>
  <div class="resetPwd">
    <div class="resetPwd-wrp">
      <div class="resetPwd-main">
        <div class="email">
          <span>邮箱</span>
          <input type="text" placeholder="Email" v-model="email">
        </div>
        <div class="password">
          <span>新密码</span>
          <input type="password" placeholder="Password" v-model="password_one">
        </div>
        <div class="password">
          <span>确认</span>
          <input type="password" placeholder="Password" v-model="password_two">
        </div>
        <div class="captcha">
          <span>验证码</span>
          <div class="down">
            <input type="text" placeholder="请输入最后计算结果" v-model="captcha">
            <div class="img" @click="loadCaptcha" v-html="captcha_img"></div>
          </div>
        </div>
        <div class="btnResetPwd">
          <a href="#" v-show="isResetPwd" @click.prevent="resetPwd">重置密码</a>
          <div class="modal" v-show="isModal">
            <spinner :status="spinner.status" :color="spinner.color" :size="spinner.size" :depth="spinner.depth" :rotation="spinner.rotation" :speed="spinner.speed"></spinner>
            <span>正在重置...</span>
          </div>
        </div>
      </div>
      <div class="resetPwd-login">
        已有账号？
        <router-link to="/login">点击登陆</router-link>
      </div>
      <transition name="alertMsg">
        <div class="resetPwd-alertMsg" v-show="alertMsg">
          <span>{{alertMsg}}</span>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import Spinner from "~/components/common/Spinner";
export default {
  data() {
    return {
      alertMsg: "",
      email: "592613734@qq.com",
      password_one: "3429802yy",
      password_two: "3429802yy",
      captcha: "",
      captcha_img: "",
      captcha_token: "",
      isResetPwd: true,
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
  created() {
    this.loadCaptcha();
  },
  methods: {
    trim(str) {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    emailReg() {
      return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    },
    passwordReg() {
      return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
    },
    async resetPwd() {
      if (!this.email) return (this.alertMsg = "邮箱不能为空");
      if (!this.emailReg().test(this.trim(this.email))) {
        this.alertMsg = "邮箱格式不正确";
        return;
      }
      if (!this.password_one) return (this.alertMsg = "密码不能为空");
      if (!this.passwordReg().test(this.trim(this.password_one))) {
        this.alertMsg = "密码必须为字母加数字且长度8-16位";
        return;
      }
      if (this.password_one !== this.password_two)
        return (this.alertMsg = "确认密码是否相同");
      if (!this.captcha) return (this.alertMsg = "验证码不能为空");
      this.isResetPwd = false;
      this.isModal = true;
      try {
        var result = await this.$http.post("/resetpwd", {
          email: this.email,
          password: this.password_one,
          captcha: this.captcha,
          captcha_token: this.captcha_token
        });
        this.isResetPwd = true;
        this.isModal = false;
        if (result.data.code !== 200) {
          this.loadCaptcha();
          return (this.alertMsg = result.data.msg);
        }
        this.$router.push(
          "/email?resetpwd=The message has been sent, please open the mailbox to complete the password reset."
        );
      } catch (err) {
        this.isResetPwd = true;
        this.isModal = false;
        this.alertMsg = "网络错误！";
        this.loadCaptcha();
      }
    },
    loadCaptcha() {
      this.$http.get("/captcha").then(res => {
        this.captcha_img = res.data.data.captcha_svg;
        this.captcha_token = res.data.data.captcha_token;
      });
    }
  },
  components: {
    Spinner
  }
};
</script>
<style lang="less" scoped>
.resetPwd {
  display: flex;
  justify-content: center;
}

.resetPwd-wrp {
  margin-top: 50px;
}
.resetPwd-main {
  width: 358px;
  height: 380px;
  box-shadow: 0px 0px 2px #ccc;
  border: 1px solid #d8dee2;
  border-radius: 5px;
  padding: 20px;
  .email,
  .password,
  .captcha {
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
      border-radius: 2px;
      padding-left: 5px;
    }
    input:focus {
      box-shadow: rgba(0, 0, 0, 0.075) 0px 0px 25px;
    }
  }

  .captcha {
    .down {
      display: flex;
      align-items: center;
      justify-content: space-between;
      input {
        width: 256px;
      }
      .img {
        cursor: pointer;
        box-sizing: border-box;
        width: 80px;
        height: 36px;
        border: 1px solid rgb(204, 204, 204);
        border-radius: 2px;
      }
    }
  }

  .btnResetPwd {
    margin-top: 20px;
    height: 36.8px;
    a {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      // background-color: #5db65d;
      background-color: #319bef;
    }
    a:active {
      // background-color: #3b8b16;
      background-color: #2f89d1;
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
}

.resetPwd-login {
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

.resetPwd-alertMsg {
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
.alertMsg-enter, .alertMsg-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

