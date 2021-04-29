<template>
  <div class="home">
    <router-view v-if="$route.meta.no_cache===true"/>
    <keep-alive>
      <router-view v-if="!$route.meta.no_cache"/>
    </keep-alive>
    <app-bottom-nav-bar/>
  </div>
</template>
<script>

import AppBottomNavBar from "@/components/AppBottomNavBar";

export default {
  components: {
    AppBottomNavBar
  },
  mounted() {

  }
};
</script>
