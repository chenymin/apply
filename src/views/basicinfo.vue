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
          <input ref="bankCardInput" class="value" type='tel' placeholder="请填写您本人借记卡卡号" v-model.lazy="myForm.bankCard" @keyup="formatBankCard($event)"/>
        </div>
        <div class="form-filed on-border">
          <label class="label">预留手机号</label>
          <input ref="bankMobileInput" class="value" type='tel' placeholder="请填写您银行预留手机号" v-model.lazy="myForm.bankMobile" @keyup.prevent="formatMobile($event)"/>
        </div>
        <button type="submit" class='primary-button top'>下一步</button>
      </form>
    </section>
  </div>
</template>

<script>
  import _ from 'lodash'
  import {mapGetters} from 'vuex'
  import {getStore} from '../utils/storage'
  import {getImgPath, formatPhone, setCaretPosition, validIdCard, validMobile, setTitle, getTitle} from '../utils/util'
  import myMixin from './_mixin/_mixin'

  export default {
    mixins: [myMixin],
    data () {
      return {
        myForm: {
          name: '',
          idNo: '',
          bankCard: '',
          bankMobile: ''
        },
        msg: {
          name: '请填写您的真实姓名',
          idNo: '请填写您的身份证号码',
          bankCard: '请填写您本人借记卡卡号',
          bankMobile: '请填写您银行预留手机号'
        },
        isValidMobile: 0,
        isValidIdCard: 0
      }
    },
    computed: {
      ...mapGetters([
        'currentData', 'userInfo'
      ]),
      imgPath () {
        const {imgPath} = this.currentData[this.getPathKey()]
        return this.getImgPath(imgPath)
      }
    },
    methods: {
      getImgPath,
      formatPhone,
      setCaretPosition,
      validMobile,
      // 格式化银行卡
      formatBankCard (event) {
        const nodeInput = this.$refs.bankCardInput
        let position = nodeInput.selectionStart
        let startLen = event.target.value.length
        let value = event.target.value.replace(/\D/g, '')
        if (value.length >= 19) {
          value = value.substring(0, 19)
        }
        if (value.length >= 16 && value.length <= 19) {
          value = value.replace(/(\d{4})(?=\d)/g, '$1 ')
        }
        if (startLen - value.length > 0) {
          position = position - (startLen - value.length - 1)
        } else {
          position = position + Math.abs(startLen - value.length)
        }
        setTimeout(() => {
          this.setCaretPosition(nodeInput, position)
        }, 1)
        nodeInput.value = value
        this.myForm.bankCard = value
      },
       // 格式化手机号
      formatMobile (event) {
        const nodeInput = this.$refs.bankMobileInput
        let position = nodeInput.selectionStart
        let startLen = event.target.value.length
        let value = event.target.value.replace(/\D/g, '')
        if (value.length > 11) {
          value = value.substring(0, 11)
        }
        if (value.length === 11) {
          value = value.replace(/\B(?=(?:\d{4})+$)/g, ' ')
        }
        if (startLen - value.length > 0) {
          position = position - (startLen - value.length - 1)
        } else {
          position = position + Math.abs(startLen - value.length)
        }
        setTimeout(() => {
          this.setCaretPosition(nodeInput, position)
        }, 1)
        nodeInput.value = value
        this.myForm.bankMobile = value
      },
      watchMobile (val) {
        if (val.length === 13) {
          let mobile = val.replace(/\D/g, '')
          this.isValidMobile = this.validMobile(mobile) ? 1 : 0
        }
      },
      watchIdNo (val) {
        console.log('watchIdNo')
        this.isValidIdCard = validIdCard(val) ? 1 : 0
      },
      baseInfoSubmit () {
        const {validSuccse, message} = this.validForm(this.myForm, this.msg)
        if (!validSuccse) {
          this.showToast(message)
          return
        }
        if (!this.isValidIdCard) {
          this.showToast('您输入的身份证号格式不正确')
          return
        }
        if (!this.isValidMobile) {
          this.showToast('您输入的手机格式不正确')
          return
        }
        const bankMobile = this.myForm.bankMobile.replace(/\D/g, '')
        const bankCard = this.myForm.bankCard.replace(/\D/g, '')
        const obj = _.assign({}, this.myForm)
        const param = _.assign(obj, {bankMobile}, {bankCard})
        const router = this.$router
        this.$store.dispatch('baseInfoVerify', {param, router})
      }
    },
    created () {
      const title = `${getTitle(getStore('sysSite'))}申请`
      setTitle(title)
      this.$watch('myForm.bankMobile', this.watchMobile)
      this.$watch('myForm.idNo', this.watchIdNo)
      this.$store.dispatch('getUserInfo').then(({name, idNo, bankCard, bankMobile}) => {
        if (!bankMobile) bankMobile = ''
        if (!bankCard) bankCard = ''
        bankMobile = bankMobile && bankMobile.replace(/\B(?=(?:\d{4})+$)/g, ' ')
        bankCard = bankCard && bankCard.replace(/(\d{4})(?=\d)/g, '$1 ')
        _.assign(this.myForm, {name, idNo, bankCard, bankMobile})
      })
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
      .text-bg {
        width: 100%;
        .img {
          height: 4.0rem;
          width: 100%;
        }
      }
    }
  }
</style>
