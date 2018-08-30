<template>
  <div class="get-following">
    <item-following :following="following" :youSelfFollowingArr="youSelfFollowingArr" v-for="following in followingArr" @loadYouFollwing="loadYouFollwing" :key="following.id"></item-following>
  </div>
</template>
<script>
import ItemFollowing from "~/components/personal/item-following";
export default {
  props: ["userId"],
  data() {
    return {
      // 作者正在关注哪些人
      followingArr: "",
      // 你自已正在关注的人
      youSelfFollowingArr: []
    };
  },

  created() {
    this.loadData();
    this.loadYouFollwing();
  },

  methods: {
    async loadData() {
      try {
        var result = await this.$http.get(
          `/follow/getTargetfollowingListByDefault`
        );
        if (result.data.code == 200) {
          this.followingArr = result.data.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 你自己正在关注的人
    async loadYouFollwing() {
      try {
        var result = await this.$http.get("/follow/getFollowingList");
        var newArr = [];

        if (result.data.code == 200) {
          result.data.data.forEach(ele => {
            if (ele) {
              newArr.push(ele.following_user_id);
            }
          });
        }
        this.youSelfFollowingArr = newArr;
      } catch (err) {
        console.log(err);
      }
    }
  },
  components: {
    ItemFollowing
  }
};
</script>
<style lang="less" scoped>
</style>

