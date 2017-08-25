<template>
  <div class="usercenter-container">
    <section class="user-info">
      <img class="header" src="https://wanzao2.b0.upaiyun.com/14460113899202.png-picSmall"></img>
      <span class="mobile">1301234567</span>
    </section>
    <ul class="loan-list">
      <li class="item">
        <p class="loan-title">
          <img class="img" src="../assets/item-fish.png"/>
          我的房金融
        </p>
        <list-item></list-item>
      </li>

      <li class="item">
        <p class="loan-title">
          <img class="img" src="../assets/item-house.png"/>
          我的星渔贷
        </p>
        <list-item></list-item>
      </li>
    </ul>
  </div>
</template>

<script>
  import listItem from '../components/listitem.vue'
  export default {
    data () {
      return {
      }
    },
    components: {
      listItem
    }
  }
</script>

<style lang="scss">
  @import "../scss/var";
  .usercenter-container {
    .user-info {
      display: flex;
      align-items: center;
      height: 2.5rem;
      background-image: url('../assets/user-bg.jpg');
      background-position: center;
      padding-left: $padding-left;
      .header {
        width: 1.32rem;
        height: 1.32rem;
        border-radius: 50%; 
      }
      .mobile {
        color: #fff;
        font-size: $primary-font-size;
        padding-left: $padding-left;
      } 
    }
    .loan-list {
      .item {
        padding: 0 $padding-left;
        background-color: #fff;
        margin-bottom: 0.3rem;
        .loan-title {
          display: flex;
          align-items: center;
          position: relative;
          font-size: 0.3rem;
          padding: 0.29rem 0;
          border-bottom: 1px solid $form-border-color;
          .img {
            width: 0.5rem;
            height: 0.5rem;
            margin-right: 0.3rem;
          };
          &::after {
            content: '';
            position: absolute;
            right: 5px;
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
    }
  }
</style>