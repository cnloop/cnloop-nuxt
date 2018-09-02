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
        <tr v-for="val in getData" :key="val.id">
          <td>
            <a :href="'/topic?id='+val.id">{{val.title}}</a>
          </td>
          <td>
            <span :data-color="val.category" v-colorFilterBackground></span>
            <span>{{val.category}}</span>
          </td>
          <td>
            <avatar v-for="(v,key) in getUserInfo(val.result_user_info)" :key="key" color="#fff" :src="v.avatar" :username="v.username" :inline=true :size=25 class="td-ava"></avatar>
          </td>
          <td>{{val.result_count?val.result_count:0}}</td>
          <td>{{converBrowsed(val.browsed)}}</td>
          <td>{{val.result_time|dataFormat}}</td>
        </tr>
      </tbody>
    </table>
    <!-- 导航 -->
    <no-ssr>
      <paginate v-if="pageCount" v-model="pageIndex" :page-count="pageCount" :page-range="3" :margin-pages="2" :click-handler="clickCallback" :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'" :page-link-class="'page-link'" :prev-link-class="'prev-link'" :next-link-class="'next-link'" :active-class="'activeEle'">
      </paginate>
    </no-ssr>
  </div>
</template>
<script>
import Avatar from "vue-avatar";
export default {
  data() {
    return {
      category: "",
      newOrhot: "",
      getData: "",
      pageIndex: 1,
      pageCount: 1
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.category = this.$route.params.category
        ? this.$route.params.category
        : "general";
      this.newOrhot = this.$route.query.newOrhot
        ? this.$route.query.newOrhot
        : "new";
      if (!this.category) return;
      if (!this.newOrhot) return;
      try {
        var result = await this.$http.get(
          `/topic/list?category=${this.category}&newOrhot=${
            this.newOrhot
          }&pageIndex=${this.pageIndex}`
        );
        if (result.data.code == 200) {
          this.getData = result.data.data.topics;
          this.pageCount = result.data.data.pageCount;
        } else {
          this.pageCount = 0;
        }
      } catch (err) {
        console.log(err);
      }
    },
    uniqueArr(arr) {
      var hash = [];
      for (var i = 0; i < arr.length; i++) {
        if (hash.indexOf(arr[i]) == -1) {
          hash.push(arr[i]);
        }
      }
      return hash;
    },
    getUserInfo(val) {
      if (!val) return;
      var arr1 = val.split("|||");
      var arr2 = this.uniqueArr(arr1);
      var arr3 = [];
      arr2.forEach(element => {
        if (element) {
          var arr4 = element.split("&&");
          var obj = {
            avatar: arr4[0] == "%empty%" ? "" : arr4[0],
            username: arr4[1] == "%empty%" ? "" : arr4[1]
          };
          if (obj.username) {
            arr3.push(obj);
          }
        }
      });
      return arr3.slice(0, 10);
    },
    async clickCallback(pageNum) {
      this.category = this.$route.params.category
        ? this.$route.params.category
        : "general";
      this.newOrhot = this.$route.query.newOrhot
        ? this.$route.query.newOrhot
        : "new";
      if (!this.category) return;
      if (!this.newOrhot) return;
      try {
        var result = await this.$http.get(
          `/topic/list?category=${this.category}&newOrhot=${
            this.newOrhot
          }&pageIndex=${pageNum}`
        );
        if (result.data.code == 200) {
          this.getData = result.data.data.topics;
          this.pageCount = result.data.data.pageCount;
          this.pageIndex = pageNum;
        }
      } catch (err) {
        console.log(err);
      }
    },
    converBrowsed(count) {
      if (count > 1000) {
        var val = count / 1000 + "";
        var result = val.substring(0, val.indexOf(".") + 2);
        return `${result}K`;
      } else {
        return count;
      }
    }
  },
  filters: {
    dataFormat(value) {
      if (!value) return "";
      var y = new Date(value).getFullYear();
      var m = new Date(value).getMonth() + 1;
      var d = new Date(value).getDate();
      value = parseInt(value);
      var dateDiff = new Date().getTime() - value;
      var oneYear = 365 * 24 * 3600 * 1000;
      var oneMonth = 30 * 24 * 3600 * 1000;
      var oneDay = 24 * 3600 * 1000;
      var oneHour = 3600 * 1000;
      var oneMin = 60 * 1000;
      if (dateDiff / oneYear >= 1) {
        return `${y}年${m}月${d}日`;
      } else if (dateDiff / oneMonth >= 1) {
        return `${m}月${d}日`;
      } else if (dateDiff / oneDay >= 1) {
        return `${Math.floor(dateDiff / oneDay)}天前`;
      } else if (dateDiff / oneHour >= 1) {
        return `${Math.floor(dateDiff / oneHour)}小时前`;
      } else if (dateDiff / oneMin >= 1) {
        return `${Math.floor(dateDiff / oneMin)}分钟前`;
      } else {
        return "刚刚";
      }
    }
  },
  directives: {
    colorFilterBackground: {
      inserted: function(el) {
        var value = el.dataset.color;
        if (!value) return "";
        if (value === "General Discussion")
          return (el.style.backgroundColor = "rgb(18, 168, 157)");
        if (value == "Get Help")
          return (el.style.backgroundColor = "rgb(101, 45, 144)");
        if (value == "Show & Vue.js")
          return (el.style.backgroundColor = "rgb(247, 148, 29)");
        if (value == "Show & CSS")
          return (el.style.backgroundColor = "rgb(191, 30, 46)");
        if (value == "Show & JS")
          return (el.style.backgroundColor = "rgb(179, 181, 180)");
        if (value == "Show & Node.js")
          return (el.style.backgroundColor = "rgb(37, 170, 226)");
      }
    }
  },
  watch: {
    $route: {
      handler: function(val) {
        this.loadData();
      }
    }
  },
  components: {
    Avatar
  }
};
</script>
<style lang="less">
.special-category {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
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
      height: 100%;
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

.special-category .pagination {
  margin-top: 50px;
  margin-bottom: 50px;
  display: inline-flex;
  align-items: center;
  box-sizing: content-box;
  border: 1px solid #ddd;
  .page-link {
    box-sizing: border-box;
    display: flex;
    padding: 6px 10px;
    border-right: 1px solid #ddd;
  }
  .page-link:first-child {
    border-left: 1px solid #ddd;
  }
  .prev-link {
    height: 100%;
    padding: 6px 10px;
  }
  .next-link {
    padding: 6px 10px;
  }
  .activeEle {
    border: 1px solid rgb(77, 144, 254);
  }
}
</style>
