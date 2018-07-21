<template>
    <div class="search">
        <div class="wrp">
            <div class="top">
                <input type="text" placeholder="搜索...">
                <span class="iconfont">&#xe651;</span>
            </div>
            <div class="bottom"></div>
        </div>
    </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.search {
  display: flex;
  justify-content: center;
  .wrp {
    width: 1100px;
    margin-top: 36px;

    .top {
      display: flex;
      align-items: center;
      input {
        box-sizing: border-box;
        outline: none;
        width: 500px;
        height: 34px;
        padding: 4px 15px;
        letter-spacing: 1px;
        border: 1px solid #ccc;
      }
      span {
        margin-left: 10px;
        font-size: 21px;
        padding: 6px 8px;
        background-color: #42b983;
        font-weight: 800;
        cursor: pointer;
        color: #fff;
        border-radius: 2px;
      }
    }
  }
}
</style>
