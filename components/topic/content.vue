<template>
  <div class="preview">
    <div class="wrp">
      <no-ssr>
        <mavon-editor v-model="previewContent" :defaultOpen='isDefaultOpen' :subfield='isSubfield' :editable='isEditable' :codeStyle='codeStyle' :boxShadow='isBoxShadow' :toolbarsFlag='false' />
      </no-ssr>
    </div>
  </div>
</template>
<script>
export default {
  props: ["previewContent"],
  data() {
    return {
      isDefaultOpen: "preview",
      isSubfield: false,
      isEditable: false,
      isBoxShadow: false,
      codeStyle: "xcode"
    };
  }
};
</script>


<style lang="less">
.preview {
  width: 100%;
}
.preview .wrp {
  width: 100%;
  height: 100%;
  .markdown-body {
    z-index: 1;
    height: 100%;
    .v-note-panel {
      border: none;
      .v-show-content {
        background-color: #fff !important;
        h1,
        h2,
        h3,
        h4,
        h5:nth-child(1) {
          margin-top: 0px;
        }
        li {
          list-style: disc;
        }
        table {
          display: table;
        }
        pre {
          font-size: 14px;
          padding: 10px 12px;
          border-radius: 0px;
          position: relative;
          background-color: #fff;
          border: 1px solid #ccc;
          .hljs {
            code {
              white-space: pre-wrap;
            }
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
            code[class*="go"]::before {
              content: "GO";
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
    .v-note-panel .v-note-show .v-show-content {
      padding: 0px;
    }
  }
}
</style>
