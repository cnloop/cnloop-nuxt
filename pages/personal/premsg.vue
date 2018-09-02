<template>
  <div class="premsg">
    <h2>消息</h2>

    <item-notice :notice="notice" v-for="notice in noticesArr" :key="notice.createdAt"></item-notice>
  </div>
</template>
<script>
import ItemNotice from "~/components/personal/item-notice";
export default {
  data() {
    return {
      noticesArr: ""
    };
  },
  created() {
    this.loadData();
    this.updateIsReadStatus();
  },
  methods: {
    async loadData() {
      try {
        var result = await this.$http.get("/notice/getNotices");
        this.noticesArr = result.data.data;
        // console.log(result);
      } catch (err) {
        console.log("local app is crash");
      }
    },
    async updateIsReadStatus() {
      var id = "";
      await this.$nextTick(() => {
        id = this.$store.state.user.id;
      });
      if (!id) return;
      try {
        var result = await this.$http.get("/notice/updateIsReadStatus");
      } catch (err) {
        console.log("updateIsReadStatus is crash ...");
      }
    }
  },
  components: {
    ItemNotice
  }
};
</script>

<style lang="less" scoped>
.premsg {
  h2 {
    padding-bottom: 8px;
    font-weight: 400;
    margin-top: -5px;
    letter-spacing: 2px;
    border-bottom: 1px #e1e4e8 solid;
  }
}
</style>
