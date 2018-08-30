<template>
  <div class="prelike">
    <h2>点赞</h2>
    <get-like></get-like>
  </div>
</template>
<script>
import GetLike from "~/components/personal/get-like";
export default {
  components: {
    GetLike
  }
};
</script>

<style lang="less" scoped>
.prelike {
  h2 {
    padding-bottom: 8px;
    font-weight: 400;
    margin-top: -5px;
    letter-spacing: 2px;
    border-bottom: 1px #e1e4e8 solid;
  }
}
</style>
