<template>
    <div class="leave-msg" v-show="isSaveTip">
        <div class="content">
            <div class="top">
                <span>消息</span>
                <span @click="close">×</span>
            </div>
            <div class="center">
                <slot>消息内容...</slot>
            </div>
            <div class="down">
                <span @click="close">确认</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: ["isSaveTip"],
  methods: {
    close() {
      this.$emit("closeSaveTip", false);
    }
  }
};
</script>

<style lang="less" scoped>
.leave-msg {
  position: fixed;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  .content {
    width: 350px;
    height: 120px;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    border-radius: 3px;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span:first-child {
        font-size: 18px;
      }
      span:last-child {
        color: #909399;
        font-size: 25px;
        cursor: pointer;
      }
      span:last-child:hover {
        color: #409eff;
      }
    }
    .center {
      width: 100%;
      color: #606266;
    }
    .down {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      span {
        padding: 5px 20px;
        border-radius: 2px;
        font-size: 12px;
        cursor: pointer;
        color: #fff;
        background-color: #3a8ee6;
      }
      span :hover {
        background-color: #83b2e3;
      }
    }
  }
}
</style>
