<template>
  <div class="write">
    <leave-msg @closeMsg="closeMsg" :isMsgShow="isMsgShow">确认离开吗？</leave-msg>
    <leave-index @closeLeaveIndex="closeLeaveIndex" :isLeaveIndex="isLeaveIndex">修改成功，即将离开</leave-index>
    <preview @closePreview='closePreview' :isPreview='isPreview' :previewContent='content'></preview>
    <save-tip @closeSaveTip="closeSaveTip" :isSaveTip="isSaveTip">内容已保存到本地</save-tip>
    <div class="wrp">
      <div class="write-header">
        <div class="title">
          <input type="text" placeholder="输入标题" maxlength="50" v-model="title">
        </div>
        <div class="write-category" @click.stop="showAllCategory($event)">
          <div class="write-left">
            <span :style="{'background-color':sel.bgc}"></span>
            <span>{{sel.text}}</span>
          </div>
          <span class="write-right" v-rotate></span>
          <div class="write-samllCategory" v-show="isShow">
            <div class="write-samllCategory-item" v-for="item in smallSel" :key="item.text" @click.stop="selectCategory(item)">
              <span :style="{'background-color':item.bgc}"></span>
              <span>{{item.text}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mk">
        <no-ssr>
          <mavon-editor :codeStyle='codeStyle' :subfield='false' :boxShadow='false' :toolbars='toolbars' v-model="content" />
        </no-ssr>
      </div>
      <div class="submit">
        <span @click="preview">预览</span>
        <span @click="submit">提交</span>
      </div>
    </div>
  </div>
</template>
<script>
import LeaveMsg from "~/components/common/leave-msg";
import LeaveIndex from "~/components/common/leave-index";
import SaveTip from "~/components/common/save-tip";

import preview from "~/components/write/preview";

export default {
  data() {
    return {
      title: "",
      content: "",
      isMsgShow: false,
      isLeaveIndex: false,
      isSaveTip: false,
      isPreview: false,
      isKip: false,
      isKipUrl: "",
      sel: { bgc: "rgb(18,168,157)", text: "General Discussion" },
      smallSel: [
        { bgc: "rgb(18,168,157)", text: "General Discussion" },
        {
          bgc: "rgb(101,45,144)",
          text: "Get Help"
        },
        {
          bgc: "rgb(247,148,29)",
          text: "Show & Vue.js"
        },
        {
          bgc: "rgb(191,30,46)",
          text: "Show & CSS"
        },
        {
          bgc: "rgb(179,181,180)",
          text: "Show & JS"
        },
        {
          bgc: "rgb(37,170,226)",
          text: "Show & Node.js"
        }
      ],
      codeStyle: "xcode",
      toolbars: {
        bold: true,
        italic: true,
        header: true,
        quote: true,
        ol: true,
        ul: true,
        link: true,
        code: true,
        table: true,
        // help: true,
        undo: true,
        redo: true,
        trash: true,
        alignleft: true,
        aligncenter: true,
        alignright: true,
        imagelink: true // 图片链接
      }
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      var topic_id = this.$route.query.id;
      try {
        var result = await this.$http.get(
          `/topic/getTopicToUpdate/${topic_id}`
        );
        if (result.data.code == 200) {
          this.title = result.data.data.title;
          this.content = result.data.data.content;
        }
      } catch (err) {
        console.log(err);
      }
    },
    closeMsg(str) {
      if (str === "yes") {
        this.isKip = true;
        window.location.href = this.isKipUrl;
      }
      this.isMsgShow = false;
    },
    closeLeaveIndex() {
      this.isLeaveIndex = false;
      window.location.href = "/";
    },
    closeSaveTip() {
      this.isSaveTip = false;
    },
    closePreview() {
      this.isPreview = false;
    },
    selectCategory(item) {
      this.sel = item;
      this.$store.commit("changeIsShow", {
        isTrue: false,
        parentClassName: ""
      });
    },
    showAllCategory(event) {
      this.$store.commit("changeIsShow", {
        isTrue: true,
        parentClassName: event.target.parentNode.className
      });
    },
    preview() {
      this.isPreview = true;
    },
    async submit() {
      var title = this.title;
      var content = this.content;
      var category = this.sel.text;
      if (title && content && category) {
        // var topic_id = this.$route.params.id;
        var topic_id = this.$route.query.id;
        var result = await this.$http.patch(
          `/topic/updateTopicById/${topic_id}`,
          {
            title,
            content,
            category
          }
        );
        if (result.data.code === 200) {
          this.isLeaveIndex = true;
          setTimeout(() => {
            this.isLeaveIndex = false;
            window.location.href = "/";
          }, 500);
        }
      } else {
        this.isTipErr = true;
      }
    }
  },
  directives: {
    rotate(el, binding, vnode) {
      if (!vnode.context.isShow) {
        el.style.transform = "rotateZ(0deg)";
      } else {
        el.style.transform = "rotateZ(90deg)";
      }
    }
  },
  computed: {
    isShow: function() {
      return (
        this.$store.state.isShow.isTrue &&
        this.$store.state.isShow.parentClassName.indexOf("write") != -1
      );
    }
  },
  components: {
    LeaveMsg,
    LeaveIndex,
    SaveTip,
    preview: preview
    // preview: () => import("~/components/write/preview")
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.isKipUrl = from.fullPath;
    });
  },
  beforeRouteLeave(to, from, next) {
    if (this.isKip) {
      next();
    } else {
      next(false);
    }
    this.isMsgShow = true;
  }
};
</script>

<style lang="less">
.write {
  display: flex;
  justify-content: center;
}

.write .wrp {
  width: 850px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.write .wrp .write-header {
  margin-top: 20px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  .title {
    width: 550px;
    height: 100%;
    border: 1px solid #d2cdcd;
    overflow-x: hidden;
    padding-left: 25px;

    input {
      border: none;
      outline: none;
      width: 100%;
      height: 100%;
      font-size: 15px;
      letter-spacing: 1px;
    }
  }
  .write-category {
    width: 255px;
    height: 100%;
    border: 1px solid #d2cdcd;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    cursor: pointer;
    .write-left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span:first-child {
        margin-left: 15px;
        font-size: 16px;
        background-color: #8b8ba2;
        width: 8px;
        height: 8px;
      }
      span:last-child {
        font-size: 12px;
        font-weight: bold;
        margin-left: 10px;
      }
    }
    .write-right {
      width: 0px;
      height: 0px;
      border-left: 6px solid #000;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      transition: all 0.2s;
      margin-right: 15px;
    }
    .write-samllCategory {
      position: absolute;
      top: 37px;
      left: 0px;
      width: 255px;
      z-index: 99;
      background-color: #fff;
      box-shadow: 0px 1px 5px 0px #ccc;
      .write-samllCategory-item {
        display: flex;
        align-items: center;
        padding: 12px 15px;
        span:first-child {
          font-size: 16px;
          width: 8px;
          height: 8px;
        }
        span:last-child {
          font-size: 12px;
          font-weight: bold;
          margin-left: 10px;
        }
      }
      .write-samllCategory-item:hover {
        background-color: #e2f5ec;
      }
    }
  }
}
.write .wrp .mk {
  .markdown-body {
    z-index: 98;
  }

  .v-note-wrapper .v-note-op {
    border: 1px solid #ccc !important;
  }
  .v-note-wrapper .v-note-panel {
    border: 1px solid #ccc !important;
    border-top: none !important;
  }

  .v-note-wrapper .v-note-op.shadow {
    box-shadow: none;
  }

  .v-note-wrapper .v-note-op .v-left-item {
    box-sizing: border-box !important;
  }

  .v-note-wrapper .v-note-op .v-right-item {
    box-sizing: border-box !important;
  }

  .v-note-wrapper .v-note-op .v-left-item .op-icon {
    font-size: 11px !important;
  }
  .v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.single-edit {
    min-height: 400px;
  }
}

.write .wrp .submit {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 100px;
  span {
    cursor: pointer;
    border-radius: 1px;
    padding: 5px 20px;
  }
  span {
    margin-left: 20px;
    border: 1px solid #dcdfe6;
  }
  span:hover {
    background-color: #ecf5ff;
    border-color: #c6e2ff;
  }
  span:last-child {
    color: #fff;
    background-color: #42b983;
  }
  span:last-child:hover {
    background-color: #7adeb1;
  }
}
</style>