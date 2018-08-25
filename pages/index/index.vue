<template>
  <div class="index-show">
    <div class="wrp">
      <category></category>
      <overview></overview>
    </div>
  </div>
</template>
<script>
import category from "~/components/index/category";
import overview from "~/components/index/overview";

export default {
  components: {
    category,
    overview
  }
};
</script>
<style lang="less" scoped>
.index-show {
  display: flex;
  justify-content: center;
  .wrp {
    margin: 30px;
    width: 1100px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
