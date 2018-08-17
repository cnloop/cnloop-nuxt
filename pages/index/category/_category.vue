<template>
  <div class="special-category">
    <table>
      <thead>
        <tr>
          <th>主题</th>
          <th>分类</th>
          <th>用户</th>
          <th>回复</th>
          <th>浏览</th>
          <th>活动</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>V-for with simple arrays: what key to use?</td>
          <td>
            <span></span>
            <span>Get Help</span>
          </td>
          <td>
            <avatar color="#fff" src="" username="吴下" :inline=true :size=25 class="td-ava"></avatar>
            <avatar color="#fff" username="Jane Doe" :inline=true :size=25 class="td-ava"></avatar>
            <avatar color="#fff" username="Jane Doe" :inline=true :size=25 class="td-ava"></avatar>
            <avatar color="#fff" username="Jane Doe" :inline=true :size=25 class="td-ava"></avatar>
            <avatar color="#fff" username="Jane Doe" :inline=true :size=25 class="td-ava"></avatar>
            <avatar color="#fff" username="Jane Doe HE" :inline=true :size=25 class="td-ava"></avatar>
          </td>
          <td>10</td>
          <td>31.3K</td>
          <td>4月20日</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Avatar from "vue-avatar";
export default {
  data() {
    return {
      params: "",
      query: ""
    };
  },
  created() {
    this.params = this.$route.params.category
      ? this.$route.params.category
      : "general";
    this.query = this.$route.query ? this.$route.query : "new";
  },
  components: {
    Avatar
  }
};
</script>
<style lang="less" scoped>
.special-category {
  display: flex;
  justify-content: center;
}
.special-category table {
  width: 1100px;
  margin-top: 40px;
}
.special-category table thead {
  width: 1100px;
  tr {
    width: 1100px;
    border-bottom: 2px solid rgb(233, 233, 233);
    th {
      font-size: 14px;
      text-align: left;
      color: #919191;
      font-weight: normal;
      padding-bottom: 18px;
      width: auto;
    }
    th:nth-child(1) {
      padding-left: 10px;
    }
    th:nth-child(2) {
      padding-left: 3px;
    }
    th:nth-child(3) {
      padding-left: 3px;
    }
    th:nth-child(4) {
      text-align: center;
    }
    th:nth-child(5) {
      text-align: center;
    }
    th:nth-child(6) {
      text-align: center;
    }
  }
}
.special-category table tbody {
  width: 1100px;
  tr {
    width: 1100px;
    border-bottom: 1px solid rgb(233, 233, 233);
    td {
      padding: 14px 0px;
    }
    td:nth-child(1) {
      max-width: 300px;
      line-height: 1.6;
      padding-left: 10px;
      font-size: 16px;
      color: #575050;
    }
    td:nth-child(2) {
      span:nth-child(1) {
        display: inline-block;
        width: 8px;
        height: 8px;
        background-color: yellow;
      }
      span:nth-child(2) {
        font-size: 12px;
        font-weight: bold;
        margin-left: 10px;
      }
    }
    td:nth-child(3) {
      display: flex;
      align-items: center;
      .td-ava:first-child {
        margin-left: 0px;
      }
      .td-ava {
        margin-left: 5px;
      }
    }
    td:nth-child(4) {
      color: #919191;
      font-weight: bold;
      font-size: 14px;
      text-align: center;
    }
    td:nth-child(5) {
      color: #fe7a15;
      font-size: 14px;
      text-align: center;
    }
    td:nth-child(6) {
      color: #919191;
      font-size: 14px;
      text-align: center;
    }
  }
}
</style>
