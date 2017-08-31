<template>
  <div class="loandetail-container">
    <section class="prompt-wrap">
      <img class="img" src="../assets/approving.png"/>
      <p class="prompt-text">星渔贷审批中</p>
    </section>
    <submit-info></submit-info>
    <button class='primary-button top'>返回</button>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import SubmitInfo from '../components/submitinfo.vue'
  export default {
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters({
        item: 'loanInfo'
      })
    },
    methods: {
      fetchData () {
        const id = this.$route.params.id
        this.$store.dispatch('fetchLoanLastData', Object.assign({}, {id}))
      }
    },
    created () {
      this.fetchData()
    },
    components: {
      SubmitInfo
    }
  }
</script>

<style lang="scss" scoped>
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
    
  }
  
</style>

