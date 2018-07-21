<template>
  <div class="verify">
    <div class="wrp">
      <h3>
        <span>{{text}}</span>
        <i>.</i>
        <i>.</i>
        <i>.</i>
      </h3>
    </div>
  </div>
</template>
<script>
import { saveUserInfo } from "~/assets/js/userinfo_init.js";

export default {
  data() {
    return {
      text: "Please wait"
    };
  },
  mounted() {
    this.insertUserOrUpdatePwd();
  },
  methods: {
    async insertUserOrUpdatePwd() {
      var register_token = this.$route.query.register_token;
      var resetPwd_token = this.$route.query.resetPwd_token;
      if (register_token) {
        try {
          var register_result = await this.$http.post("/register/email", { register_token });
          console.log(register_result.data);
          if (register_result.data.code == 200) {
            saveUserInfo(register_result.data.data);
            this.$store.commit("changeUser", register_result.data.data.user);
            this.$router.push("/");
          } else {
            this.text = register_result.data.msg;
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          var resetPwd_token = await this.$http.post("/resetpwd/update", { resetPwd_token });
          console.log(resetPwd_token.data);
          if (resetPwd_token.data.code == 200) {
            saveUserInfo(resetPwd_token.data.data);
            this.$store.commit("changeUser", resetPwd_token.data.data.user);
            this.$router.push("/");
          } else {
            this.text = result.data.msg;
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.verify {
  display: flex;
  justify-content: center;
  .wrp {
    width: 600px;
    height: 500px;
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    h3 {
      font-size: 50px;
      i {
        animation: isShow 1s ease-out infinite;
      }
      i:nth-child(1) {
        animation-delay: 0.6s;
      }
      i:nth-child(2) {
        animation-delay: 0.8s;
      }
      i:nth-child(3) {
        animation-delay: 1s;
      }
    }
    @keyframes isShow {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  }
}
</style>

