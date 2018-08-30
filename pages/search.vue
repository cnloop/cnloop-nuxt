<template>
  <div class="search">
    <div class="wrp">
      <div class="top">
        <input type="text" v-inputEnter placeholder="搜索..." v-model="searchKey">
        <span class="iconfont" @click="search">&#xe651;</span>
      </div>
      <div class="bottom">
        <get-search-item :toItemKeyWorld="toItemKeyWorld" :search="search" v-for="search in searchArr" :key="search.id"></get-search-item>
      </div>
    </div>
  </div>
</template>
<script>
import GetSearchItem from "~/components/search/get-search-item";
export default {
  data() {
    return {
      searchKey: "",
      toItemKeyWorld: "",
      searchArr: ""
    };
  },
  methods: {
    async search() {
      this.toItemKeyWorld = this.searchKey;
      try {
        var result = await this.$http.get(
          `/search/getResult/${this.searchKey}`
        );
        if (result.data.code == 200) {
          this.searchArr = result.data.data;
        } else {
          this.searchArr = "";
        }
      } catch (err) {
          this.searchArr = "";
        console.log("Loacl app is crash...");
      }
    }
  },
  directives: {
    inputEnter: {
      inserted: function(el, binding, vnode) {
        el.onkeyup = function() {
          if (window.event.keyCode == 13) {
            vnode.context.search();
          }
        };
      }
    }
  },
  components: {
    GetSearchItem
  }
};
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
    .bottom {
      margin-top: 30px;
    }
  }
}
</style>
