<template>
  <div class="prefans">
    <h2>粉丝</h2>
    <get-followers></get-followers>
  </div>
</template>
<script>
import GetFollowers from "~/components/personal/get-followers";
export default {
  components: {
    GetFollowers
  }
};
</script>

<style lang="less" scoped>
.prefans {
  h2 {
    padding-bottom: 8px;
    font-weight: 400;
    margin-top: -5px;
    letter-spacing: 2px;
    border-bottom: 1px #e1e4e8 solid;
  }
}
</style>
