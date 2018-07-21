<template>
  <div class="nuxt-app" v-isShow>
    <nav-top></nav-top>
    <nuxt/>
  </div>
</template>
<script>
import NavTop from "~/components/nav/nav-top";
import { getUserInfo } from "~/assets/js/userinfo_init.js";
export default {
  components: {
    NavTop
  },
  mounted() {
    this.loadUserInfo();
  },
  methods: {
    //记载用户信息，并存储到store
    loadUserInfo() {
      if (getUserInfo()) {
        var user = JSON.parse(getUserInfo()).user;
        this.$store.commit("changeUser", user);
      } else {
        this.$store.commit("changeUser", "");
      }
    }
  },
  directives: {
    isShow: {
      inserted: function(el, binding, vnode) {
        window.addEventListener("click", function(ev) {
          vnode.context.$store.commit("changeIsShow", {
            isTrue: false,
            parentClassName: ""
          });
        });
      }
    }
  }
};
</script>

<style>
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
body,
form,
fieldset,
input,
textarea,
blockquote,
p {
  padding: 0;
  margin: 0;
}
a {
  color: #000;
  text-decoration: none;
}
li {
  list-style-type: none;
}
img {
  vertical-align: top;
  border: 0;
}
ol,
ul {
  list-style: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

th,
td {
  padding: 0px;
}
html {
  font-family: Helvetica, Arial, sans-serif;
}

@font-face {
  font-family: "iconfont";
  src: url("//at.alicdn.com/t/font_693384_wj61h4yt3vh.woff") format("woff");
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>
