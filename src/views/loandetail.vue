<template>
  <div class="loandetail-container">
    <confirm
      :title='title'
      :isShow='isShow'
    ></confirm>
    <section class="prompt-wrap">
      <img class="img" :src="getImgPath(imgPath[loanInfo.status])"/>
      <p class="prompt-text">{{currentData.title.label}}{{statusText[loanInfo.status]}}</p>
    </section>
    <submit-info :info="loanDetailData.info"></submit-info>
    <a class="contract-apply" :href="loanInfo.contracUrl" target="_blank" v-if='loanInfo.status === "1"'>合同</a>
    <button class='primary-button top' @click="goLoanListPage">返回</button>
    <button class='primary-button top btn-bg-white' v-if='loanInfo.status === "1" && loanInfo.proType === "02"' @click="showConfirm">提前申请还款</button>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import myMixin from './_mixin/_mixin'
  import SubmitInfo from '../components/submitinfo.vue'
  import Confirm from '../components/confirm'
  import {getImgPath} from '../utils/util'
  import _ from 'lodash'
  export default {
    mixins: [myMixin],
    data () {
      return {
        imgPath: [
          'approving.png',
          'approved.png',
          'approved-refused.png',
          'prepayment.png',
          'approved.png'
        ],
        title: '确定申请提前还款?',
        isShow: false
      }
    },
    computed: {
      ...mapGetters([
        'pageSource', 'loanInfo', 'statusText'
      ]),
      loanDetailData () {
        return this.currentData[this.getPathKey()]
      },
      currentData () {
        const type = this.$route.params.type
        return this.pageSource[type]
      }
    },
    methods: {
      getImgPath,
      fetchData () {
        const id = this.$route.params.id
        this.$store.dispatch('fetchLoanInfo', {id, pageData: this.loanDetailData})
      },
      goLoanListPage () {
        this.$router.go(-1)
      },
      showConfirm () {
        this.eventBus.$emit('confirm/show', true)
      },
      prepaymentApply () {
        const type = this.$route.params.type
        const loanId = this.$route.params.id
        const amount = this.loanInfo.amount
        const loanPerods = this.loanInfo.loanPerods
        const param = _.assign({}, {loanId, amount, loanPerods})
        this.$store.dispatch('prepayment', {param}).then(({data, code}) => {
          if (code === 'suss') {
            this.eventBus.$emit('confirm/show', false)
            this.$router.push({
              name: 'prepaymentapply',
              params: {id: loanId, type}
            })
          }
        })
      }
    },
    created () {
      this.eventBus.$on('confirm/ok', this.prepaymentApply)
      this.fetchData()
    },
    components: {
      SubmitInfo,
      Confirm
    }
  }
</script>

<style lang="scss" scoped>
  @import "../scss/var";
  .loandetail-container {
    display: flex;
    flex-direction: column;
    .prompt-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 3.5rem;
      background: #fff;
      .img {
        width: 1.52rem;
        height: 1.52rem;
      }
      .prompt-text {
        color: #333;
        font-size: 0.36rem;
      }
    }

    .contract-apply {
      position: relative;
      display: flex;
      align-items: center;
      background: #fff;
      padding: 0 0.3rem;
      margin-top: 0.3rem;
      height: 1rem;
      font-size: 0.32rem;
      color: #444;
      &::before {
        position: absolute;
        right: 0.6rem;
        content: '查看合同'
      }
      &::after {
        content: '';
        position: absolute;
        right: 0.3rem;
        width: 12px;
        height: 12px;
        border-bottom: solid 2px #ccc;
        border-right: solid 2px #ccc;
        transform: rotate(-45deg);
        top: 50%;
        margin-top: -6px;
      }
    }
  }

</style>

