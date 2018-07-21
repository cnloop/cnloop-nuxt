<template>
  <div class="preview" v-show="isPreview">
    <div class="wrp">
      <span @click="close" class="close">CLOSE</span>
      <no-ssr>
        <mavon-editor v-model="previewContent" :defaultOpen='isDefaultOpen' :subfield='isSubfield' :editable='isEditable' :codeStyle='codeStyle' :boxShadow='isBoxShadow' :toolbarsFlag='false' />
      </no-ssr>
    </div>
  </div>
</template>
<script>
export default {
  props: ["previewContent", "isPreview"],
  data() {
    return {
      isDefaultOpen: "preview",
      isSubfield: false,
      isEditable: false,
      isBoxShadow: false,
      codeStyle: "xcode"
    };
  },
  methods: {
    close() {
      this.$emit("closePreview");
    }
  }
};
</script>


<style lang="less">
.preview {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}
.preview .wrp {
  width: 850px;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .close {
    position: absolute;
    top: 5px;
    right: 8px;
    cursor: pointer;
    z-index: 1000;
  }
  .markdown-body {
    z-index: 1;
    border-radius: 5px;
    height: 100%;
    .v-note-panel {
      border: none;
      border-radius: 5px;
      .v-show-content {
        background-color: #fff !important;
        li {
          list-style: disc;
        }
        table{
          display:table;
        }
        pre {
          font-size: 14px;
          padding: 10px 12px;
          border-radius: 0px;
          position: relative;
          background-color: #fff;
          border: 1px solid #ccc;
          .hljs {
            code[class*="javascript"]::before {
              content: "JS";
              font-size: 13px;
              position: absolute;
              top: 5px;
              right: 12px;
              letter-spacing: 0.5px;
              color: rgba(104, 91, 91, 0.4);
            }
            code[class*="html"]::before {
              content: "HTML";
              font-size: 13px;
              position: absolute;
              top: 5px;
              right: 12px;
              letter-spacing: 0.5px;
              color: rgba(104, 91, 91, 0.4);
            }
            code[class*="css"]::before {
              content: "CSS";
              font-size: 13px;
              position: absolute;
              top: 5px;
              right: 12px;
              letter-spacing: 0.5px;
              color: rgba(104, 91, 91, 0.4);
            }
            code[class*="shell"]::before {
              content: "SH";
              font-size: 13px;
              position: absolute;
              top: 5px;
              right: 12px;
              letter-spacing: 0.5px;
              color: rgba(104, 91, 91, 0.4);
            }
          }
        }
      }
    }
  }
}
</style>
