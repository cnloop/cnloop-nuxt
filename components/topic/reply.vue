<template>
  <div class="reply">
    <div class="main">
      <div class="top">
        <div class="left">
          <span>Reply：</span>
          <div v-if="parentComment" class="right">
            <i>@</i>
            <span>{{parentComment.username}}</span>
          </div>
        </div>
        <i @click.stop="closeReply" class="iconfont">&#xe8e7;</i>
      </div>

      <div class="center">
        <textarea v-model="content" placeholder="支持Markdown语法..."></textarea>
      </div>

      <div class="bottom">
        <span @click.stop="commitValue" class="commit">提交</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["topicObj", "parentComment"],
  data() {
    return {
      content: ""
    };
  },
  methods: {
    closeReply() {
      this.$emit("closeReply");
    },
    async commitValue() {
      if (this.parentComment) {
        var _this = this;
        var result = await _this.$http.post("/comment/comment_son", {
          content: _this.content,
          parent_comment_id: _this.parentComment.commentId
        });
        this.$store.commit("changeReplyEndAndLoad");
        this.content = "";
        this.$emit("closeReply");
      } else {
        try {
          var _this = this;
          var result = await _this.$http.post("/comment", {
            content: _this.content,
            topic_id: _this.topicObj.id
          });
          this.$store.commit("changeReplyEndAndLoad");
          this.content = "";
          this.$emit("closeReply");
        } catch (err) {
          console.log(err);
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.reply {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(229, 229, 236, 0.5);
  display: flex;
  justify-content: center;
  z-index: 100;
}
.reply .main {
  margin-top: 80px;
  width: 600px;
  height: 500px;
  background-color: #fff;
  padding: 20px 30px;
}
.reply .main {
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    color: #303133;
    .left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .right {
        margin-left: 5px;
        color: #50bfff;
        i {
          color: #50bfff;
        }
        span {
          margin-left: 2px;
        }
      }
    }
    i {
      cursor: pointer;
      font-size: 18px;
      color: #909399;
    }
  }

  .center {
    margin-top: 20px;
    textarea {
      width: 582px;
      height: 390px;
      resize: none;
      overflow-y: hidden;
      border: 1px solid #ccc;
      outline-style: none;
      padding: 8px;
      font-size: 15px;
      line-height: 25px;
      font-family: Helvetica, Arial, sans-serif;
    }
  }

  .bottom {
    margin-top: 12px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .commit {
      padding: 8px 15px;
      font-size: 16px;
      letter-spacing: 4px;
      border-radius: 2px;
      color: #fff;
      cursor: pointer;
      background-color: #409eff;
    }
  }
}
</style>
