<template>
  <div id="app">
    <router-view></router-view>
    <my-toast 
           :title="toast.title" 
           :content="toast.content"
           :is-show-toast="toast.isShowToast">
    </my-toast>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getStore} from './utils/storage'
import MyToast from './components/toast'
export default {
  name: 'app',
  computed: {
    ...mapGetters([
      'toast'
    ])
  },
  components: {
    MyToast
  },
  created () {
    // 页面刷新重新获得页面元素
    const type = getStore('sysSite')
    this.$store.commit('GET_CURRENT_DATA', {type})
    console.log(this.toast)
  }
}
</script>

<style lang="scss">
  @import 'scss/app.scss';
</style>
