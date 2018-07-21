<template>
  <section class="container">
    <nav-middle></nav-middle>
    <nuxt-child/>
  </section>
</template>

<script>
import NavMiddle from "~/components/nav/nav-middle";
export default {
  components: {
    NavMiddle
  }
};
</script>

<style>

</style>


