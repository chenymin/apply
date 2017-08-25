<template>
  <section class="material-wrap">
      <div class="material-ready">
        <p class="material-text">申请房抵款，需要准备以下材料</p>
        <ol class="ol-wrap">
          <li class="item">1.营业执照等经营性证明材料</li>
          <li class="item">2.公司章程、验资报告、财务报表</li>
          <li class="item">3.法人身份证</li>
          <li class="item">4.存货权属证明材料（购销合同、发票、支付凭证等）</li>
          <li class="item">5.其他相关资料</li>
        </ol>
      </div>
  </section>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    props: {
    }
  }
</script>

<style lang="scss" scoped>
  .material-wrap {
    background-color: #fff;
      .material-ready {
        border: 1px dashed #cda76e;
        background-color: #f5ede2;
        margin: 0 0.3rem;
        padding: 0.1rem;
        .material-text {
          padding-left: 0.3rem;
          font-size: 0.24rem;
          padding: 0.1rem;
        }
        .ol-wrap{
          font-size: 0.24rem;
        }
        .item {
          padding: 0.1rem;
        }
      }
  }
</style>
