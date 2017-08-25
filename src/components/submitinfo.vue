<template>
  <div class="submitinfo-container">
    <section>
      <ul class="ul-wrap">
        <li class="item">
          <span class="left-text">企业名称</span>
          <span class="right-text">上海水产集团有限公司</span>
        </li>
        <li class="item">
          <span class="left-text">申请金额</span>
          <span class="right-text">100万</span>
        </li>
        <li class="item">
          <span class="left-text">借款期限</span>
          <span class="right-text">3个月</span>  
        </li>
        <li class="item on-border">
          <span class="left-text">申请时间</span>
          <span class="right-text">2017/07/20 12:02</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
  .ul-wrap{
    .item {
      position: relative;
      display: flex;
      align-items: center;
      font-size: 0.32rem;
      color: #444;
      height: 1rem;
      padding: 0 0.3rem;
      background-color: #fff;
      &::after {
        position: absolute;
        content: '';
        border-bottom: 1px solid #eee;
        width: 100%;
        height: 1px;
        margin-top: -1px;
        top:100%;
        left: 0;
      }
      .right-text {
        flex: 1;
        text-align: right;
      }
    }
    .on-border {
      &::after {
        border-bottom: none;
      }
    }
  }
</style>
