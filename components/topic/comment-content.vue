<template>
  <div class="topic-comment" v-if="isShow">
    <a :href="$route.hash" v-aotuClick></a>
    <reply v-show="replyShow" :parentComment='parentComment' @closeReply='closeReply'></reply>
    <div :id="comment.id" class="main-content" v-for="comment in commentData" :key="comment.id">
      <!-- avatar -->
      <div class="left">
        <avatar color="#fff" :src="comment.avatar" :username="comment.username" :inline=false :size=43></avatar>
      </div>
      <div class="right">
        <div class="top">
          <div class="user-name">{{comment.username}}</div>
          <span>{{comment.createdAt|dataFormat}}</span>
        </div>
        <no-ssr>
          <preview class="preview" :previewContent='comment.content'></preview>
        </no-ssr>
        <div class="bottom">
          <!-- 一级评论 -->
          <div v-showCommentSon v-show="comment.comment_son_info" class="showCommentSon">
            <span class="show-number">{{getReplyCount(comment.comment_son_info)}}</span>
            <span class="show-reply">回复</span>
            <span class="iconfont">&#xe8f2;</span>
          </div>
          <div>
            <!-- 小手 -->
            <span :class="{ changeLikeColor:haveCommentLike(comment.parent_comment_sets) }" @click="insertCommentLike(comment.id)" class="iconfont">&#xe62e;</span>
            <span :class="{ changeLikeColor:haveCommentLike(comment.parent_comment_sets) }">{{getCommentLikeCount(comment.parent_comment_sets)}}</span>
          </div>
          <div v-if="$store.state.user">
            <span @click="openReply(comment.username,comment.id)" class="iconfont">&#xe60d;</span>
          </div>
        </div>
        <!-- 二级评论 -->

        <div class="commentSon">
          <div v-hideCommentSon class="commentSon-icon">
            <span class="iconfont">&#xe8f5;</span>
          </div>
          <div class="commentSon-wrp" v-for="v in splitData(comment.comment_son_info)" :key="v.id">
            <div class="commentSon-left">
              <avatar color="#fff" :src="v.avatar" :username="v.username" :inline=false :size=43></avatar>
            </div>
            <div class="commentSon-right">
              <div class="top">
                <div class="user-name">{{v.username}}</div>
                <span>{{v.createdAt|dataFormat}}</span>
              </div>
              <no-ssr>
                <preview class="commentSon-preview" :previewContent='v.content'></preview>
              </no-ssr>
              <!-- 二级评论小手图标 -->
              <div class="bottom">
                <div>
                  <span :class="{ changeLikeColor:haveCommentLike(v.son_like_sets) }" @click="insertCommentSonLike(v.id)" class="iconfont">&#xe62e;</span>
                  <span :class="{ changeLikeColor:haveCommentLike(v.son_like_sets) }" class='numberShow'>{{getCommentLikeCount(v.son_like_sets)}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Avatar from "vue-avatar";
import Reply from "~/components/topic/reply";
export default {
  props: ["topicId"],
  data() {
    return {
      commentData: "",
      isShow: false,
      replyShow: false,
      parentComment: ""
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      if (!this.topicId) return;
      var _this = this;
      try {
        var result = await this.$http.get(`/comment/list/${_this.topicId}`);
        if (result.data.code == 200) {
          this.commentData = result.data.data;
          console.log(this.commentData);
          this.isShow = true;
        }
      } catch (err) {
        console.log(err);
      }
    },
    closeReply() {
      this.replyShow = false;
    },
    openReply(commentUserName, commentId) {
      this.parentComment = {
        username: commentUserName,
        commentId: commentId
      };
      this.replyShow = true;
    },
    getReplyCount(values) {
      if (!values) return;
      var newArr = [];
      values.split("|").forEach(ele => {
        if (ele) {
          newArr.push(ele);
        }
      });
      return newArr.length;
    },
    splitData(values) {
      if (!values) return;
      var arr = values.split("|||");
      var newArr = [];
      arr.forEach(element => {
        if (element) {
          var sonArr = element.split("&&");
          var obj = {
            avatar: sonArr[0] == "%empty%" ? "" : sonArr[0],
            username: sonArr[1] == "%empty%" ? "" : sonArr[1],
            id: sonArr[2] == "%empty%" ? "" : sonArr[2],
            content: sonArr[3] == "%empty%" ? "" : sonArr[3],
            user_id: sonArr[4] == "%empty%" ? "" : sonArr[4],
            createdAt: sonArr[5] == "%empty%" ? "" : sonArr[5],
            son_like_sets: sonArr[6] == "%empty%" ? "" : sonArr[6]
          };
          newArr.push(obj);
        }
      });
      return newArr;
    },
    async insertCommentLike(commentId) {
      if (!commentId) return;
      try {
        var result = await this.$http.post(
          `/comment/like_comment/${commentId}`
        );
        if (result.data.code == 200) {
          this.loadData();
        }
      } catch (err) {
        console.log(err);
      }
    },
    async insertCommentSonLike(commentSonId) {
      if (!commentSonId) return;
      try {
        var result = await this.$http.post(
          `/comment/like_comment_son/${commentSonId}`
        );
        if (result.data.code == 200) {
          this.loadData();
        }
      } catch (err) {
        console.log(err);
      }
    },
    getCommentLikeCount(vals) {
      if (!vals) return;
      var arr = vals.split(",");
      var newArr = [];
      arr.forEach(element => {
        if (element) {
          newArr.push(element);
        }
      });
      return newArr.length;
    },
    haveCommentLike(vals) {
      if (!vals) return false;
      return vals.indexOf(this.$store.state.user.id) >= 0;
    }
  },
  directives: {
    showCommentSon: {
      inserted: function(el, binding, vnode) {
        el.showCommentSon = false;
        el.onclick = function() {
          var icon = vnode.children[2].elm;
          var commentSonNode = vnode.elm.parentNode.nextSibling;
          if (!el.showCommentSon) {
            icon.style.transform = "rotateZ(180deg)";
            commentSonNode.style.display = "block";
            el.showCommentSon = true;
          } else {
            icon.style.transform = "rotateZ(0deg)";
            commentSonNode.style.display = "none";
            el.showCommentSon = false;
          }
        };
      }
    },
    hideCommentSon: {
      inserted: function(el, binding, vnode) {
        el.onclick = function() {
          var commentSon = vnode.elm.parentNode;
          var replyCount = commentSon.previousSibling.children[0].children[2];
          commentSon.style.display = "none";
          replyCount.parentNode.showCommentSon = false;
          replyCount.style.transform = "rotateZ(0deg)";
        };
      }
    },
    aotuClick: {
      inserted: function(el, binding, vnode) {
        var hash = vnode.context.$route.hash;
        if (hash) {
          el.click();
        }
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
  components: {
    preview: () => import("~/components/topic/content"),
    Avatar,
    Reply
  },
  watch: {
    "$store.state.replyEndAndLoad": {
      handler(val) {
        this.loadData();
      },
      deep: true
    }
  }
};
</script>
<style lang="less">
.topic-comment {
  .main-content {
    margin-top: 10px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e4e4e4;
    display: flex;
    justify-content: space-between;
    padding-top: 15px;
    .right {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-left: 14px;
      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #bdbdbd;
        font-size: 14px;
        .user-name {
          font-weight: 600;
        }
      }
      .preview {
        margin-top: 14px;
        .wrp .v-note-wrapper {
          min-height: 80px !important;
        }
      }
      .bottom {
        margin-top: 10px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: relative;
        .showCommentSon {
          position: absolute;
          left: 0px;
          font-size: 15px;
          display: flex;
          align-items: center;
          vertical-align: bottom;
          cursor: pointer;
          border-radius: 2px;
          span:nth-child(1) {
            font-size: 14px;
          }
          span:nth-child(2) {
            margin-right: 5px;
          }
          span:nth-child(3) {
            font-size: 17px;
            transition: all 0.2s;
          }
        }
        .changeLikeColor {
          color: #03a9f4;
        }
        span {
          font-size: 20px;
          color: #c1c1c1;
        }
        div {
          height: 25px;
          margin-right: 20px;
          cursor: pointer;
          span:nth-child(1) {
            margin-right: 5px;
          }
          span:nth-child(2) {
            font-size: 12px;
          }
        }
        div:last-child {
          margin-right: 0px;
        }
      }
    }
  }
  .main-content {
    position: relative;
    .right {
      .commentSon {
        display: none;
        margin-top: 20px;
        border: 1px solid #e9e9e9;
        position: relative;
        .commentSon-icon {
          position: absolute;
          left: -18px;
          bottom: 40px;
          width: 32px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid #e9e9e9;
          cursor: pointer;
          background-color: #fff;
          span {
            font-size: 18px;
            font-weight: 600;
            color: #ccc;
          }
        }
        .commentSon-icon:hover {
          background-color: #e9e9e9;
        }
        .commentSon-wrp {
          padding-left: 20px;
          padding-right: 20px;
          margin-top: 25px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #e9e9e9;
          padding-bottom: 12px;
          .commentSon-right {
            display: flex;
            flex-direction: column;
            margin-left: 14px;
            width: 100%;
            .top {
              display: flex;
              align-items: center;
              justify-content: space-between;
              color: #bdbdbd;
              .user-name {
                font-weight: 600;
              }
            }
            .commentSon-preview {
              margin-top: 14px;
              .wrp .v-note-wrapper {
                min-height: 80px !important;
              }
            }
            .bottom {
              margin-top: 2px;
              display: flex;
              justify-content: flex-end;
              align-items: center;
              cursor: pointer;
              span {
                font-size: 20px;
                color: #c1c1c1;
              }
              .numberShow {
                font-size: 12px;
              }
              .changeLikeColor {
                color: #03a9f4;
              }
            }
          }
        }

        .commentSon-wrp:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
