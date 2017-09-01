<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {getStore} from './utils/storage'
export default {
  name: 'app',
  created () {
    // 页面刷新重新获得页面元素
    const type = getStore('sysSite')
    this.$store.commit('GET_CURRENT_DATA', {type})
  }
}
</script>

<style lang="scss">
  @import 'scss/app.scss';
</style>
