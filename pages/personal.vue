<template>
  <div class="personal">
    <div class="wrp">
      <div class="left">
        <h2>Home</h2>
        <span :class="{sel:isSel==='/personal/pretopic'||isSel===''}" @click="$router.push('/personal/pretopic')">文章</span>
        <span :class="{sel:isSel==='/personal/precomment'}" @click="$router.push('/personal/precomment')">评论</span>
        <span :class="{sel:isSel==='/personal/prefollow'}" @click="$router.push('/personal/prefollow')">关注</span>
        <span :class="{sel:isSel==='/personal/prefans'}" @click="$router.push('/personal/prefans')">粉丝</span>
        <span :class="{sel:isSel==='/personal/prelike'}" @click="$router.push('/personal/prelike')">点赞</span>
        <span :class="{sel:isSel==='/personal/premsg'}" @click="$router.push('/personal/premsg')">消息</span>
        <span :class="{sel:isSel==='/personal/precollection'}" @click="$router.push('/personal/precollection')">收藏</span>
      </div>
      <div class="right">
        <nuxt-child></nuxt-child>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isSel: ""
    };
  },
  watch: {
    $route: {
      handler: function(val) {
        if (val.path === "/personal") {
          this.isSel = "/personal/pretopic";
          this.$router.push("/personal/pretopic");
          return;
        }
        this.isSel = val.path;
      },
      immediate: true
    }
  }
};
</script>
<style lang="less" scoped>
.personal {
  display: flex;
  justify-content: center;
  .wrp {
    width: 1100px;
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    .left {
      margin-top: 60px;
      width: 220px;
      height: 268px;
      display: flex;
      flex-direction: column;
      border: 1px solid #d1d5da;
      border-radius: 3px;
      font-size: 13px;
      h2 {
        font-size: 13px;
        font-weight: 600;
        padding: 8px 10px;
        background-color: #f3f5f8;
        border-bottom: 1px solid #e1e4e8;
      }
      span {
        cursor: pointer;
        padding: 8px 10px;
        border-bottom: 1px solid #e1e4e8;
        color: #0366d6;
        letter-spacing: 1px;
        position: relative;
      }
      span:last-child {
        border-bottom: none;
      }
      span:hover {
        background: #f6f8fa;
      }
      .sel:after {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 2px;
        content: "";
        background-color: #e36209;
      }
    }
    .right {
      width: 800px;
    }
  }
}
</style>
