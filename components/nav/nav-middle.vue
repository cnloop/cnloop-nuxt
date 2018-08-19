<template>
  <div class="nav-middle">
    <div class="wrp">
      <div class="left">
        <div class="category" @click.stop="showCategory($event)">
          <div class="left">
            <span :style="{'background-color':sel.bgc}"></span>
            <span>{{sel.text}}</span>
          </div>
          <span class="triangle" v-rotate ref="triangle"></span>
          <div class="samllCategory" v-show="this.isShow">
            <div class="item" v-for="item in smallSel" :key="item.text" @click.stop="selectCategory(item)">
              <span :style="{'background-color':item.bgc}"></span>
              <span>{{item.text}}</span>
            </div>
          </div>
        </div>
        <a class="home" href="#" :class="{changeClass:'home'===routerQuery}" @click.prevent="toNewOrHot('home')">HOME</a>
        <a class="new" href="#" :class="{changeClass:'new'===routerQuery}" @click.prevent="toNewOrHot('new')">NEW</a>
        <a class="hot" href="#" :class="{changeClass:'hot'===routerQuery}" @click.prevent="toNewOrHot('hot')">HOT</a>
      </div>
      <div class="right" v-show="$store.state.user">
        <nuxt-link to="/write">
          <span>+</span>
          <span>Create Topic</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sel: { bgc: "#3ee770", text: "Home", router: "/home" },
      smallSel: [
        { bgc: "#3ee770", text: "Home", router: "/home" },
        {
          bgc: "rgb(18,168,157)",
          text: "General Discussion",
          router: "/general"
        },
        {
          bgc: "rgb(101,45,144)",
          text: "Get Help",
          router: "/help"
        },
        {
          bgc: "rgb(247,148,29)",
          text: "Show & Vue.js",
          router: "/vue"
        },
        {
          bgc: "rgb(191,30,46)",
          text: "Show & CSS",
          router: "/css"
        },
        {
          bgc: "rgb(179,181,180)",
          text: "Show & JS",
          router: "/js"
        },
        {
          bgc: "rgb(37,170,226)",
          text: "Show & Node.js",
          router: "/node"
        }
      ],
      routerQuery: "home"
    };
  },
  methods: {
    toNewOrHot(params) {
      if (params === "home") {
        this.$router.push("/");
        return;
      }
      if (this.$route.path === "/") {
        this.$router.push({
          path: "/category/general",
          query: { newOrhot: params }
        });
        return;
      }
      this.$router.push({
        path: this.$route.path,
        query: { newOrhot: params }
      });
    },
    selectCategory(item) {
      this.sel = item;
      this.$store.commit("changeIsShow", false);
      if (item.router === "/home") {
        this.$router.push("/");
      } else {
        this.$router.push({
          path: `/category${item.router}`,
          query: { newOrhot: "new" }
        });
      }
    },
    showCategory(event) {
      this.$store.commit("changeIsShow", {
        isTrue: true,
        parentClassName: event.target.parentNode.className
      });
    }
  },
  computed: {
    isShow: function() {
      return (
        this.$store.state.isShow.isTrue &&
        (this.$store.state.isShow.parentClassName === "category" ||
          this.$store.state.isShow.parentClassName === "left")
      );
    }
  },
  directives: {
    rotate(el, binding, vnode) {
      if (!vnode.context.isShow) {
        el.style.transform = "rotateZ(0deg)";
      } else {
        el.style.transform = "rotateZ(90deg)";
      }
    }
  },
  watch: {
    $route: {
      handler: function(val) {
        if (val.path === "/" || val.path.indexOf("home") != -1) {
          this.routerQuery = "home";
          this.sel = this.smallSel[0];
          this.$router.push("/");
          return;
        }
        if (val.query.newOrhot === "hot") {
          this.routerQuery = "hot";
        } else {
          this.routerQuery = "new";
        }
        this.smallSel.filter(item => {
          var result = val.path.indexOf(item.router);
          if (result != -1) {
            this.sel = item;
            return;
          }
        });
      },
      immediate: true
    }
  }
};
</script>
<style lang="less" scoped>
.nav-middle {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
.nav-middle .wrp {
  width: 1100px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    width: 600px;
    height: 30px;
    display: flex;
    align-items: center;
    .changeBgc {
      color: #fff;
      background-color: #34495e;
    }
    .home,
    .new,
    .hot {
      color: #000;
      padding: 5px 10px;
      font-size: 15px;
      margin-left: 15px;
      border-radius: 3px;
    }
    .changeClass {
      color: #fff;
      background-color: #34495e;
    }
    .category {
      box-sizing: border-box;
      width: 210px;
      display: flex;
      justify-content: space-between;
      border: 1px solid #d2cdcd;
      align-items: center;
      position: relative;
      padding: 0px 10px;
      cursor: pointer;
      .left {
        font-size: 15px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        span:first-child {
          font-size: 16px;
          color: #8b8ba2;
          width: 8px;
          height: 8px;
        }
        span:last-child {
          margin-left: 10px;
        }
      }
      .triangle {
        width: 0px;
        height: 0px;
        border-left: 6px solid #000;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        transition: all 0.2s;
      }
    }

    .category .samllCategory {
      position: absolute;
      top: 40px;
      left: 0px;
      width: 210px;
      background-color: #fff;
      box-shadow: 0px 1px 5px 0px #ccc;
      z-index: 99;
      .item {
        display: flex;
        align-items: center;
        padding: 12px 10px;
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
      .item:hover {
        background-color: #e2f5ec;
      }
      .item:nth-child(1) {
        span:first-child {
          background-color: #3ee770;
        }
      }
      .item:nth-child(2) {
        margin-top: 0px;
        span:first-child {
          background-color: rgb(18, 168, 157);
        }
      }
      .item:nth-child(3) {
        span:first-child {
          background-color: rgb(101, 45, 144);
        }
      }
      .item:nth-child(4) {
        span:first-child {
          background-color: rgb(247, 148, 29);
        }
      }
      .item:nth-child(5) {
        span:first-child {
          background-color: rgb(191, 30, 46);
        }
      }
      .item:nth-child(6) {
        span:first-child {
          background-color: rgb(179, 181, 180);
        }
      }
      .item:nth-child(7) {
        span:first-child {
          background-color: rgb(37, 170, 226);
        }
      }
    }
  }

  .right {
    a {
      box-sizing: border-box;
      width: 120px;
      height: 30px;
      color: #000;
      padding: 0px 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #d2cdcd;
    }
  }
}
</style>
