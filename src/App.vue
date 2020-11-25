<template>
  <div id="app">
    <!-- 一级路由出口 仅缓存layoutIndex,而不缓存其下级路由-->
    <keep-alive :include="cachePages">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapState(['cachePages'])
  }
}
</script>

<style lang='less'></style>
