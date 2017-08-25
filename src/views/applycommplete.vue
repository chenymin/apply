<template>
  <div class="applycommplete-container">
    <section class="apply-state">
      <img class="img" src="../assets/icon-fish.png">
      <div>
        <p class="success-text">星渔贷申请预约成功！</p>
        <p class="small-text">请准备好申请材料，专属信贷经理将为您服务</p>
      </div>
    </section>
    <material-detail></material-detail>
    <submit-info></submit-info>
    <p class="btn-group">
      <button class='primary-button top'>查看申请记录</button>
      <button class='primary-button btn-bg-white top'>完成</button>
    </p>
    
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import MaterialDetail from '../components/materialdetail.vue'
  import SubmitInfo from '../components/submitinfo.vue'
  export default {
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters({
        obj: 'xingYuLoanData'
      })
    },
    components: {
      SubmitInfo,
      MaterialDetail
    },
    created () {
      console.log(this.obj)
    }
  }
</script>

<style lang="scss">
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