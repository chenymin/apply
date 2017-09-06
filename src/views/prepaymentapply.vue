<template>
  <div class="applycommplete-container">
    <section class="apply-state">
      <img class="img" :src="imgSrc">
      <div>
        <p class="success-text">{{titleName}}提前还款申请已提交！</p>
        <p class="small-text">专属客户经理会尽快联系您，协助提前还款事宜</p>
      </div>
    </section>
    <submit-info :info="prepaymentData.info"></submit-info>
    <p class="btn-group">
      <button class='primary-button top' @click="jumpToLoanListPage">完成</button>
    </p>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import SubmitInfo from '../components/submitinfo.vue'
  import myMixin from './_mixin/_mixin'
  import {getImgPath} from '../utils/util'
  import {getStore} from '../utils/storage'
  export default {
    mixins: [myMixin],
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters([
        'currentData'
      ]),
      prepaymentData () {
        return this.currentData[this.getPathKey()]
      },
      imgSrc () {
        const {imgPath} = this.prepaymentData
        return this.getImgPath(imgPath)
      },
      titleName () {
        const {label} = this.currentData.title
        return label
      }
    },
    methods: {
      getImgPath,
      jumpToLoanListPage () {
        this.$router.push({name: 'loanlist', params: {proType: getStore('sysSite')}})
      }
    },
    components: {
      SubmitInfo
    },
    created () {
      const id = this.$route.params.id
      this.$store.dispatch('fetchLoanInfo', {id, pageData: this.prepaymentData})
    }
  }
</script>

<style lang="scss" scoped>
  @import "../scss/var";
  .applycommplete-container {
    padding-bottom: 0.3rem;
    .apply-state {
      display: flex;
      flex-direction: column;
      height: 3.5rem;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      .img {
        width: 1.27rem;
        height: 1.27rem;
      }
      .success-text {
        color: #333;
        text-align: center;
        font-size: $primary-font-size;
      }
      .small-text {
        font-size: 0.3rem;
        color: #999;
      }
    }
    .btn-group {
      display: flex;
      flex-direction: column;
    }
  }
</style>


