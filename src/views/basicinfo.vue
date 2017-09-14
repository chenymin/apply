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
          <input class="value" type='text' :class="{'text-readonly': nameIsReadOnly}" placeholder="请填写您的真实姓名" v-model="myForm.name" :readonly='nameIsReadOnly'/>
        </div>
        <div class="form-filed on-border bottom">
          <label class="label">身份证号</label>
          <input class="value" :class="{'text-readonly': idNoIsReadOnly}" type='text' placeholder="请填写您的身份证号码" v-model="myForm.idNo" :readonly='idNoIsReadOnly'/>
        </div>
        <div class="form-filed">
          <label class="label">银行卡号</label>
          <input ref="bankCardInput" class="value" type='tel' :placeholder="myPlaceholder" v-model.lazy="myForm.bankCard" @keyup="formatBankCard($event)"/>
        </div>
        <div class="form-filed on-border">
          <label class="label">{{mobileLable}}</label>
          <input ref="bankMobileInput" class="value" type='tel' :placeholder="mobilePlaceholder" v-model.lazy="myForm.bankMobile" @keyup.prevent="formatMobile($event)"/>
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
          bankCard: this.getMyPlaceholder(),
          bankMobile: this.getMobilePlaceholder()
        },
        noFormatIdNo: '',
        isValidMobile: 0,
        isValidIdCard: 0,
        nameIsReadOnly: false,
        idNoIsReadOnly: false
      }
    },
    computed: {
      ...mapGetters([
        'currentData', 'userInfo'
      ]),
      imgPath () {
        const {imgPath} = this.currentData[this.getPathKey()]
        return this.getImgPath(imgPath)
      },
      myPlaceholder () {
        return this.getMyPlaceholder()
      },
      mobileLable () {
        return getStore('sysSite') === '02' ? '预留手机号' : '手机号'
      },
      mobilePlaceholder () {
        return this.getMobilePlaceholder()
      }
    },
    methods: {
      getImgPath,
      formatPhone,
      setCaretPosition,
      validMobile,
      getMyPlaceholder () {
        return getStore('sysSite') === '02' ? '请填写您本人借记卡卡号' : '请填写您开户行账号'
      },
      getMobilePlaceholder () {
        return getStore('sysSite') === '02' ? '请填写您银行预留手机号' : '请填写您银行手机号'
      },
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
        val = this.noFormatIdNo !== '' ? this.noFormatIdNo : this.myForm.idNo
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
        const idNo = this.noFormatIdNo !== '' ? this.noFormatIdNo : this.myForm.idNo
        const obj = _.assign({}, this.myForm)
        const param = _.assign(obj, {bankMobile, bankCard, idNo})
        const router = this.$router
        this.$store.dispatch('baseInfoVerify', {param, router})
      },
      formatIdNo (val) {
        return val.length === 18 ? val.replace(/(\d{4})\d{10}(\d{4})/, '$1**********$2') : val.replace(/(\d{4})\d{7}(\d{4})/, '$1*******$2')
      }
    },
    created () {
      setTitle(`${getTitle(getStore('sysSite'))}申请`)
      this.$watch('myForm.bankMobile', this.watchMobile)
      this.$watch('myForm.idNo', this.watchIdNo)
      this.$store.dispatch('getUserInfo').then(({name, idNo, bankCard, bankMobile}) => {
        if (!bankMobile) bankMobile = ''
        if (!bankCard) bankCard = ''
        if (!idNo) idNo = ''
        this.nameIsReadOnly = !name || name === '' ? 0 : 1
        this.idNoIsReadOnly = !idNo || idNo === '' ? 0 : 1
        bankMobile = bankMobile && bankMobile.replace(/\B(?=(?:\d{4})+$)/g, ' ')
        bankCard = bankCard && bankCard.replace(/(\d{4})(?=\d)/g, '$1 ')
        this.noFormatIdNo = idNo
        idNo = this.formatIdNo(idNo)
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
    .text-readonly {
      color: #999
    }
  }
</style>
