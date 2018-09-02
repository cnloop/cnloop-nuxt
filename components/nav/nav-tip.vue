<template>
  <div class="nav-tip" v-show="isNavTipShow" v-navTipClick>
    <div class="nav-tip-wrp">
      <div class="top">
        <h2>CNLOOP</h2>
      </div>
      <div class="bottom">
        <div class="introduce">
          <span></span>
          <span>请选择快捷登录方式</span>
          <span></span>
        </div>
        <div class="passport">
          <div class="github" @click="loginBygithub">
            <span class="iconfont">&#xe7ab;</span>
            <span>Github</span>
          </div>
          <div class="local" @click="toLogin">
            <span class="iconfont">&#xe643;</span>
            <span>本地登陆</span>
          </div>
          <div class="qq">
            <span class="iconfont">&#xe657;</span>
            <span>QQ</span>
          </div>
        </div>
        <div class="help">
          <span>QQ登陆功能暂时未开通</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["isNavTipShow"],
  data() {
    return {};
  },
  methods: {
    closeNavTip() {
      this.$emit("closeNavTip", false);
    },
    loginBygithub() {
      window.location.href =
        "https://github.com/login/oauth/authorize?client_id=8a98ceca42bdf7bd689e&redirect_uri=https://cnloop.link/api/github";
    },
    toLogin(){
        this.closeNavTip();
        this.$router.push('/login');
    }
  },
  directives: {
    navTipClick: {
      inserted(el, binding, vnode) {
        el.addEventListener("click", function(ev) {
          if (ev.target.className === "nav-tip") {
            vnode.context.closeNavTip();
          }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.nav-tip {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(229, 229, 236, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  .nav-tip-wrp {
    width: 400px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .top {
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px 5px 0px 0px;
      background: -webkit-gradient(
        linear,
        right top,
        left bottom,
        from(#42b983),
        to(#2e4339)
      );
      h2 {
        font-size: 28px;
        color: #fff;
        letter-spacing: 2px;
      }
    }
    .bottom {
      height: 300px;
      border-radius: 0px 0px 5px 5px;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding: 30px 20px;
      justify-content: space-between;
      .introduce {
        margin-top: -13px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #827979;
        span:nth-child(1) {
          width: 90px;
          height: 1px;
          background-color: #ebebf6;
        }

        span:nth-child(3) {
          width: 90px;
          height: 1px;
          background-color: #ebebf6;
        }
      }
      .passport {
        display: flex;
        justify-content: space-between;
        padding: 0px 40px;
        .github,
        .local,
        .qq {
          display: flex;
          justify-content: space-between;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
        }
        .github span:nth-child(1) {
          font-size: 55px;
          color: rgb(199, 232, 182);
        }
        .github span:nth-child(2) {
          margin-top: 15px;
          font-size: 12px;
          color: #959595;
        }
        .local span:nth-child(1) {
          font-size: 55px;
          color: rgb(255, 215, 164);
        }
        .local span:nth-child(2) {
          font-size: 12px;
          color: #959595;
        }
        .qq span:nth-child(1) {
          font-size: 55px;
          color: rgb(104, 165, 225);
        }
        .qq span:nth-child(2) {
          font-size: 12px;
          color: #959595;
        }
      }
      .help {
        display: flex;
        justify-content: center;
        span {
          font-size: 12px;
          color: #959595;
          letter-spacing: 0.5px;
        }
      }
    }
  }
}
</style>
