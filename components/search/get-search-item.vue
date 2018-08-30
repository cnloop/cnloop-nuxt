<template>
    <div class="get-search-item">
        <!-- 左边内容：头像 -->
        <div class="left" @click="$router.push(`/userInfo?id=${search.user_id}`)">
            <avatar color="#fff" :src="search.avatar" :username="search.username" :inline=false :size=50></avatar>
        </div>
        <!-- 右边内容 -->
        <div class="right">
            <!-- 第一行：姓名、发表日期 -->
            <div>
                <span @click="$router.push(`/userInfo?id=${search.user_id}`)" class="username">{{search.username}}</span>
                <span class="createdAt">{{search.createdAt|dataFormat}}</span>
            </div>
            <!-- 第二行：文章题目 -->
            <div>
                <a :href="`/topic?id=${search.id}`" v-html="reg_title(search.title)"></a>
            </div>
            <!-- 第三行：评论目标 -->
            <div>
                <span v-html="reg_content(search.content)">
                </span>
            </div>
        </div>
    </div>
</template>
<script>
import Avatar from "vue-avatar";

export default {
  props: ["search", "toItemKeyWorld"],
  methods: {
    reg_title(tilte) {
      return tilte.replace(
        new RegExp(`${this.toItemKeyWorld}`, "gim"),
        `<i style="color:red;font-style:normal">${this.toItemKeyWorld}</i>`
      );
    },
    reg_content(content) {
      var wordAt = content.search(new RegExp(`${this.toItemKeyWorld}`, "gim"));
      if (wordAt < 0) return content.substring(0, 150);
      var start = wordAt - 100;
      var end = wordAt + 150;
      content = content.substring(start, end);
      console.log(content);
      return content.replace(
        new RegExp(`${this.toItemKeyWorld}`, "gim"),
        `<i style="color:red;font-style:normal">${this.toItemKeyWorld}</i>`
      );
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
  components: {
    Avatar
  }
};
</script>
<style lang="less" scoped>
.get-search-item {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px #e1e4e8 solid;
  padding: 20px 0px;
  .lefe {
    cursor: pointer;
  }
  .right {
    width: 100%;
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    div:nth-child(1) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .username {
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
      }
      .username:hover {
        color: #2faee3;
      }
      .createdAt {
        color: #999;
        font-size: 12px;
      }
    }
    div:nth-child(2) {
      display: flex;
      align-items: center;
      margin-top: 10px;
      a {
        line-height: 28px;
        color: #0097d0;
      }
    }
    div:nth-child(3) {
      margin-top: 12px;
      background-color: #f4f4f4;
      padding: 4px 2px;
      display: flex;
      align-items: center;
      span {
        line-height: 18px;
        font-size: 12px;
      }
    }
  }
}
</style>
