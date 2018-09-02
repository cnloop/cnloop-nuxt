<template>
  <div class="setting">
    <div class="wrp">
      <div class="item">
        <span>昵称</span>
        <input type="text" v-model="nickname">
      </div>
      <div class="item">
        <span>签名</span>
        <input type="text" v-model="motto">
      </div>
      <div class="item">
        <span>头像</span>
        <span>仅支持JPG、PNG格式，文件小于200KB(方形图)</span>
      </div>
      <div class="ava">
        <div class="avawrp">
          <input v-imageUpload ref="fileInput" class="top" type="file" title="更改头像">
          <avatar :src="isSrc" :size=80 class="bottom" :username="username"></avatar>
        </div>
      </div>
      <div class="update">
        <div class="updatewrp">
          <span @click="uploadToServer">保存</span>
          <span @click="quit">取消</span>
        </div>
      </div>
      <div v-show="showTips" class="showTip">
        <span>{{showTips}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import Avatar from "vue-avatar";

export default {
  data() {
    return {
      isSrc: "",
      nickname: "",
      motto: "",
      username: "",
      showTips: ""
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.$nextTick(function() {
        this.nickname = this.$store.state.user.nickname;
        this.motto = this.$store.state.user.motto;
        this.isSrc = this.$store.state.user.avatar;
        this.usernme = this.$store.state.user.usernme;
      });
      // this.nickname = this.$store.state.user.nickname;
      // this.motto = this.$store.state.user.motto;
      // this.isSrc = this.$store.state.user.avatar;
      // this.usernme = this.$store.state.user.usernme;
    },
    quit() {
      this.$router.push("/");
    },
    async uploadToServer() {
      var file = this.$refs.fileInput.files[0];
      var formData = new FormData();
      formData.append("file", file);
      formData.append("nickname", this.nickname);
      formData.append("motto", this.motto);
      try {
        var result = await this.$http.post("/user/updateUserInfo", formData);
        if (result.data.code != 200) {
          return (this.showTips = "请选择正确的图片...");
        }
        this.$store.commit("changeUser", result.data.data);
        var userInfo = JSON.parse(window.localStorage.getItem("cnloop"));
        userInfo.user = result.data.data;
        window.localStorage.setItem("cnloop", JSON.stringify(userInfo));

        this.$router.push("/");
      } catch (err) {
        this.showTips = "请选择正确的图片...";
      }
    }
  },
  directives: {
    imageUpload: {
      inserted: function(el, binding, vnode) {
        el.addEventListener(
          "change",
          function() {
            var file = el.files[0];
            //限定上传文件的类型，判断是否是图片类型
            if (!/image\/\w+/.test(file.type)) {
              alert("只能选择图片");
              return false;
            }
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e) {
              var base64Code = this.result;
              vnode.context.$data.isSrc = base64Code;
            };
          },
          false
        );
      }
    }
  },
  components: {
    Avatar
  }
};
</script>

<style lang="less" scoped>
.setting {
  display: flex;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #fafafb;
  z-index: -1;
  .wrp {
    margin-top: 70px;
    width: 1100px;
    display: inline-flex;
    height: 80px;
    flex-direction: column;
    align-items: center;
    height: 100%;
    background-color: #fafafb;
    .item {
      width: 412px;
      margin-top: 45px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        color: #999;
        font-size: 13px;
        margin-right: 65px;
        letter-spacing: 1.5px;
      }
      input {
        padding: 6px 9px;
        width: 318px;
        height: 36px;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
        background-color: #fff;
        outline: none;
        box-sizing: border-box;
      }
    }
    .item:nth-child(3) {
      span:first-child {
        width: 40px;
        margin-right: 60px;
      }
    }
    .ava {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 412px;
      margin-top: 48px;
      .avawrp {
        position: relative;
        overflow: hidden;
        margin-left: 85px;
        .top {
          top: 0px;
          left: 0px;
          position: absolute;
          width: 80px;
          height: 80px;
          opacity: 0;
          cursor: pointer;
        }
      }
    }
    .update {
      margin-top: 45px;
      width: 412px;
      display: flex;
      justify-content: center;
      align-items: center;
      .updatewrp {
        margin-left: 80px;
        width: 220px;
        display: flex;
        span {
          cursor: pointer;
          border-radius: 4px;
          padding: 5px 20px;
          border: 1px solid #dcdfe6;
        }
        span:hover {
          background-color: #ecf5ff;
          border-color: #c6e2ff;
        }
        span:last-child {
          margin-left: 70px;
        }
      }
    }
    .showTip {
      width: 400px;
      padding: 4px 5px;
      margin-top: 30px;
      background-color: #fef0f0;
      color: #f56c6c;
      font-size: 14px;
      border-radius: 2px;
    }
  }
}
</style>
