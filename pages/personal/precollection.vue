<template>
  <div class="precollection">
    <h2>收藏</h2>
    <get-collection></get-collection>
  </div>
</template>
<script>
import GetCollection from "~/components/personal/get-collection";
export default {
  components: {
    GetCollection
  }
};
</script>

<style lang="less" scoped>
.precollection {
  h2 {
    padding-bottom: 8px;
    font-weight: 400;
    margin-top: -5px;
    letter-spacing: 2px;
    border-bottom: 1px #e1e4e8 solid;
  }
}
</style>

