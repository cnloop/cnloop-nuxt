<template>
  <div class="get-followers">
    <item-followers :followers="followers" :youSelfFollowingArr="youSelfFollowingArr" v-for="followers in followersArr" @loadYouFollwing="loadYouFollwing" :key="followers.id"></item-followers>
  </div>
</template>
<script>
import ItemFollowers from "~/components/personal/item-followers";
export default {
  props: ["userId"],
  data() {
    return {
      // 作者正在被哪些人关注
      followersArr: "",
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
          `/follow/getTargetFollowersListByDefault`
        );
        if (result.data.code == 200) {
          this.followersArr = result.data.data;
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
    ItemFollowers
  }
};
</script>
<style lang="less" scoped>
</style>

