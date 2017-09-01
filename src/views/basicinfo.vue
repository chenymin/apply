<template>
  <div class='baseinfo-container'>
    <section class="introduction-info bottom">
     <p class="text-bg">
       <img class="img" :src="imgPath"/>
     </p>
    </section>
    <section class="baseinfo-form">
      <form class='form-wrap' @submit.prevent="baseInfoSubmit()">
        <div class="form-filed">
          <label class="label">姓名</label>
          <input class="value" type='text' placeholder="请填写您的真实姓名" v-model="myForm.name"/>
        </div>
        <div class="form-filed on-border bottom">
          <label class="label">身份证号</label>
          <input class="value" type='text' placeholder="请填写您的身份证号码" v-model="myForm.idNo"/>
        </div>
        <div class="form-filed">
          <label class="label">银行卡号</label>
          <input ref="bankCard" class="value" type='tel' placeholder="请填写您本人借记卡卡号" v-model="formatBankCard" @keyup="formatCard($event)"/>
        </div>
        <div class="form-filed on-border">
          <label class="label">预留手机号</label>
          <input class="value" type='tel' placeholder="请填写您银行预留手机号" v-model="formatMobile"/>
        </div>
        <button type="submit" class='primary-button top'>下一步</button>
      </form>
    </section>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getImgPath, formatPhone} from '../utils/util'
  import _ from 'lodash'
  export default {
    data () {
      return {
        formatMobile: '',
        formatBankCard: '',
        myForm: {
          name: '',
          idNo: '',
          bankCard: '',
          bankMobile: ''
        }
      }
    },
    computed: {
      ...mapGetters([
        'currentData'
      ]),
      imgPath () {
        const {imgPath} = this.currentData[_.replace(this.$route.path, '/', '')]
        return this.getImgPath(imgPath)
      }
    },
    methods: {
      getImgPath,
      formatPhone,
      formatCard (event) {
      },
      baseInfoSubmit () {
        console.log('baseInfoSubmit')
        const bankMobile = '15026681424'
        const bankCard = '6366364364636436'
        const param = _.assign(this.myForm, {bankMobile}, {bankCard})
        const router = this.$router
        this.$store.dispatch('baseInfoVerify', {param, router})
      }
    },
    created () {
      this.$store.dispatch('getUserInfo')
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
      .img {
        height: 4.0rem;
        width: 100%;
      }
    }
  }
  
</style>