<template>
    <div class="gitubPage">
        <div v-if="isShow" class="wrp">
            <strong>提示：</strong>
            <span>{{tip}}</span>
        </div>
    </div>
</template>
<script>
import { saveUserInfo } from "~/assets/js/userinfo_init.js";
export default {
  data() {
    return {
      isShow: false,
      tip: "无法获取到您的Gitub授权，检查您是否公开了Email"
    };
  },
  mounted() {
    this.getGithub();
  },
  methods: {
    getGithub() {
      var data = this.$route.query.data;
      if (!data) {
        this.isShow = true;
        return;
      }
      saveUserInfo(JSON.parse(data));
      this.$store.commit("changeUser", JSON.parse(data));
      this.$router.push("/");
    }
  }
};
</script>
<style lang="less" scoped>
.gitubPage {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  .wrp {
    margin-top: 220px;
    display: inline-flex;
    justify-content: center;
    font-size: 20px;
  }
}
</style>

