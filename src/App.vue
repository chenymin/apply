<template>
  <div id="app">
    <router-view></router-view>
    <my-toast
           :title="toast.title"
           :content="toast.content">
    </my-toast>
    <loading></loading>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getStore} from './utils/storage'
import MyToast from './components/toast'
import Loading from './components/loading/loding'
export default {
  name: 'app',
  computed: {
    ...mapGetters([
      'toast'
    ])
  },
  components: {
    MyToast,
    Loading
  },
  created () {
    // 页面刷新重新获得页面元素
    const type = getStore('sysSite')
    this.$store.commit('GET_CURRENT_DATA', {type})

    const data = {verifyCodeCount: getStore('verifyCodeCount')}
    this.$store.commit('SEND_SMS_CODE', {data})
  }
}
</script>

<style lang="scss">
  @import 'scss/app.scss';
</style>
