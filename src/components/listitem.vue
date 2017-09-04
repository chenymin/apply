<template>
  <div class="loan-detail">
    <p class="loan-detail-p">
      <span class="detail-des">{{item.amount | formatMoney}}</span>
      <span  class="detail-title">借款金额(元)</span>
    </p>
    <p class="loan-detail-p">
      <span class="detail-des">{{item.createTime}}</span>
      <span  class="detail-title">申请时间</span>
    </p>
    <p class="loan-detail-p">
      <span class="detail-status" :class="{'status-approvaling': item.status !== 2, 'status-refused': item.status === 2}">{{statusText[item.status]}}</span>
      <span class="detail-title">借款状态</span>
    </p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        statusText: [
          '审批中',
          '审批通过',
          '审批拒绝',
          '还款中',
          '已结清'
        ]
      }
    },
    props: {
      item: {
        type: Object,
        default () {
          return {
            amount: '',
            createBy: '',
            status: ''
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../scss/var";
  .loan-detail {
    display: flex;
    padding: 0.2rem 0;
    .loan-detail-p {
      display: flex;
      flex-direction: column;
      flex: 1;
      .detail-des {
        font-size: $middle-font-size;
        color: $primary-color;
      }
      .detail-title {
        font-size: 0.24rem;
        color: #999;
        padding-top: 0.2rem;
      };
      .detail-status  {
        font-size: $middle-font-size;
      }
      .status-refused {
        color: #ff6633;
      }
      .status-approvaling {
        color: #6596f0;
      }
    }
  }
</style>

