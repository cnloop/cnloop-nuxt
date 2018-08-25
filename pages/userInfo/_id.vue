<template>
  <div class="userInfo">
    <div class="wrp">
      <user-info-left></user-info-left>
      <user-info-right></user-info-right>
    </div>

  </div>
</template>
<script>
import UserInfoLeft from "~/components/user/userInfo-left";
import UserInfoRight from "~/components/user/userInfo-right";

export default {
  data() {
    return {};
  },
  components: {
    UserInfoLeft,
    UserInfoRight
  }
};
</script>
<style lang="less" scoped>
.userInfo {
  width: 100%;
  display: flex;
  justify-content: center;
  .wrp {
    margin-top: 30px;
    width: 1100px;
    display: flex;
  }
}
</style>
