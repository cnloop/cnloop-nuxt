<template>
  <div class="prefollow">
    <h2>关注</h2>
    <get-following></get-following>
  </div>
</template>
<script>
import GetFollowing from "~/components/personal/get-following";
export default {
  components: {
    GetFollowing
  }
};
</script>

<style lang="less" scoped>
.prefollow {
  h2 {
    padding-bottom: 8px;
    font-weight: 400;
    margin-top: -5px;
    letter-spacing: 2px;
    border-bottom: 1px #e1e4e8 solid;
  }
}
</style>
