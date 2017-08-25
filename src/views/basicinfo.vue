<template>
  <div class='baseinfo-container'>
    <section class="introduction-info bottom">
     <p class="text-bg">
       <img class="img" src="../assets/xingyu-pei.png"/>
     </p>
    </section>
    <section class="baseinfo-form">
      <form class='form-wrap'>
        <div class="form-filed">
          <label class="label">姓名</label>
          <input class="value" type='text' placeholder="请填写您的真实姓名"/>
        </div>
        <div class="form-filed on-border bottom">
          <label class="label">身份证号</label>
          <input class="value" type='text' placeholder="请填写您的真实姓名"/>
        </div>
        <div class="form-filed">
          <label class="label">银行卡号</label>
          <input class="value" type='tel' placeholder="请填写您本人借记卡卡号"/>
        </div>
        <div class="form-filed on-border">
          <label class="label">预留手机号</label>
          <input class="value" type='tel' placeholder="请填写您银行预留手机号"/>
        </div>
        <button class='primary-button top'>下一步</button>
      </form>
    </section>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>

<style lang="scss">
   @import "../scss/var";
  .baseinfo-container {
    .introduction-info {
      display: flex;
      height: 4.0rem;
      margin-bottom: 0.2rem;
      background-color: #fff;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: $middle-font-size;
      background-image: url(../assets/xingyu-base.jpg);
      background-position: center;
      background-size: 100%;
      background-repeat: no-repeat;
      .text-bg {
        display: flex;
        align-items: center;
        background-color: #cda76e;
        border-radius: 2px;
        margin-left: -2.5rem;
        margin-top: 0.3rem; 
        .img {
          height: 0.4rem;
        }
      }
    }
  }
  
</style>