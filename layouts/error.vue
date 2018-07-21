<template>
  <div class="err_page">
    <div class="wrp">
      <div class="img">
        <div class="left">

        </div>
        <div class="right">

        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.err_page {
  .wrp {
    position: fixed;
    top: 0px;
    height: 400px;
    background-image: url("~/assets/images/github_2.jpg");
    background-size: cover;
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    .img {
      width: 600px;
      height: 100%;
      display: flex;
      box-sizing: border-box;
      justify-content: space-between;
      align-items: center;
      padding: 0px 60px;
      .left {
        width: 270px;
        height: 249px;
        background-image: url("~/assets/images/github_3.png");
      }
      .right {
        width: 188px;
        height: 229px;
        background-image: url("~/assets/images/github_1.png");
      }
    }
  }
}
</style>
