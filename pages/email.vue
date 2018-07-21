<template>
  <div class="email">
    <div class="email-wrp">
      <div class="top">
        <h2>Welcome to cnloop</h2>
      </div>
      <div class="down">
        <h2>Hi</h2>
        <h2>{{msg}}</h2>
        <h2>Thanks</h2>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg:
        "The email has been sent, please open the mailbox to complete the registration."
    };
  },
  mounted() {
    this.loadMsg();
  },
  methods: {
    loadMsg() {
      var getMsg = this.$route.query.resetpwd;
      if (getMsg) {
        return (this.msg = getMsg);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.email {
  display: flex;
  justify-content: center;
  align-items: center;
  .email-wrp {
    margin-top: 100px;
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .top {
      width: 100%;
      height: 50px;
      color: #fff;
      background-color: #41af53;
      text-align: center;
      line-height: 50px;
    }
    .down {
      box-sizing: border-box;
      // height: 300px;
      border: 1px solid #ccc;
      border-top: none;
      padding: 10px;
      h2:nth-child(2) {
        margin-top: 30px;
        text-indent: 2em;
        line-height: 50px;
      }
      h2:last-child {
        text-align: right;
        margin-top: 100px;
      }
    }
  }
}
</style>
