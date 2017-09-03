<template>
  <div class="applycommplete-container">
    <section class="apply-state">
      <img class="img" :src="imgSrc">
      <div>
        <p class="success-text">{{titleName}}申请预约成功！</p>
        <p class="small-text">请准备好申请材料，专属信贷经理将为您服务</p>
      </div>
    </section>
    <material-detail :material="commpleteData.materialnfo"></material-detail>
    <submit-info :info="commpleteData.info"></submit-info>
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
  import myMixin from './_mixin/_mixin'
  import {getImgPath} from '../utils/util'
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
      commpleteData () {
        return this.currentData[this.getPathKey()]
      },
      imgSrc () {
        const {imgPath} = this.commpleteData
        return this.getImgPath(imgPath)
      },
      titleName () {
        const {label} = this.currentData.title
        return label
      }
    },
    methods: {
      getImgPath
    },
    components: {
      SubmitInfo,
      MaterialDetail
    },
    created () {
      const id = this.$route.params.id
      this.$store.dispatch('fetchLoanInfo', {id, commpleteData: this.commpleteData})
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
