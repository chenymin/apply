<template>
  <div class="applyinfo-container">
    <section class="baseinfo-form">
      <form class='form-wrap' @submit.prevent="applyInfoSubmit()">
        <factory :factor="applyInfo"></factory>
        <p class="protocol">
          <input type="checkbox" id="checkbox" checked="checked" name="protocol" value="1" v-model="protocolChecked" class="check-box">
          <label class="protocol-label" for="checkbox">
            我已阅读并同意
          </label>
          <a class="protocol-link" :href="getProtocolSrc" target="_blank">《个人线上借款协议》</a>
        </p>
        <button type="submit" class='primary-button'>提交申请</button>
      </form>
    </section>
  </div>
</template>

<script>
  import _ from 'lodash'
  import {mapGetters} from 'vuex'
  import myMixin from './_mixin/_mixin'
  import {getStore} from '../utils/storage'
  import {setTitle, getTitle} from '../utils/util'
  import factory from '../components/factory/factory'
  export default {
    mixins: [myMixin],
    data () {
      return {
        msg_xingyudai: {
          amount: '请输入申请金额',
          comName: '请输入企业名称',
          comLicense: '请输入用营业执照',
          address: '请填写详细经营地址',
          city: '请选择省份'
        },
        msg_fangjinrong: {
          amount: '请输入申请金额',
          loanPerods: '请选择贷款期数',
          repayType: '请选择还款方式',
          address: '请填写您居住的详细地址',
          mail: '请填写您的电子邮箱',
          city: '请选择省份',
          houseAddress: '请填写您的房产详细地址',
          propertyRights: '请输入产权人姓名'
        },
        myForm: {
          type: '',
          repayType: '',
          mail: '',
          houseAddress: ''
        },
        protocolChecked: 0
      }
    },
    computed: {
      ...mapGetters([
        'currentData', 'applyEdit'
      ]),
      applyInfo () {
        return this.currentData[this.getPathKey()]
      },
      getProtocolSrc () {
        let url = ''
        const type = getStore('sysSite')
        if (type === '02') {
          url = `/static/protocol/${'xinyudai'}.htm`
        } else if (type === '01') {
          if (this.applyEdit.city.indexOf('上海')) {
            url = `/static/protocol/${'shanghai'}.htm`
          } else if (this.applyEdit.city.indexOf('北京')) {
            url = `/static/protocol/${'beijing'}.htm`
          }
        }
        return url
      }
    },
    methods: {
      applyInfoSubmit () {
        const router = this.$router
        const type = getStore('sysSite')
        const param = _.assign({}, this.applyEdit, {type})
        const {validSuccse, message} = this.validForm(this.applyEdit, type === '02' ? this.msg_xingyudai : this.msg_fangjinrong)
        if (!validSuccse) {
          this.showToast(message)
          return
        }
        if (type === '02' && this.applyEdit['amount'] > 500 || type === '01' && this.applyEdit['amount'] > 1000) {
          this.showToast('您输入的金额超过最大值')
          return
        }

        if (!this.isNumber(this.applyEdit['amount'])) {
          this.showToast('您输入的金额不全为数字')
          return
        }

        if (type === '01' && !this.isEmail(this.applyEdit['mail'])) {
          this.showToast('您输入的邮箱格式不对')
          return
        }

        if (!this.protocolChecked) {
          this.showToast('请勾选个人线上借款协议')
          return
        }
        this.$store.dispatch('addLoanApply', {param, router})
      },
      isNumber (val) {
        const reg = new RegExp('^[0-9]*$')
        return reg.test(val)
      },
      isEmail (val) {
        const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        return reg.test(val)
      },
      load () {
        this.$store.commit('bindDefaultValue', this.getPathKey())
      }
    },
    components: {
      factory
    },
    created () {
      const title = `${getTitle(getStore('sysSite'))}申请`
      setTitle(title)
      this.load()
    }
  }
</script>

<style lang="scss">
  .applyinfo-container {
    .protocol{
      position: relative;
      height: 40px;
      line-height: 40px;
      padding-left: 20px;
      display: flex;
    }
    .check-box {
      display: none;
    }
    .check-box + .protocol-label::before {
      content: '';
      position: absolute;
      left: 0;
      border:1px solid #e0ac60;
      width:0.4rem;
      height:0.4rem;
      top: 50%;
      margin-top: -0.2rem; 
    }
    .check-box:checked + .protocol-label::before {
      background-color: #e0ac60;
    }
    .check-box:checked + .protocol-label::after {
      content: '';
      position: absolute;
      width: 0.28rem;
      height: 0.15rem;
      background: transparent;
      top: 50%;
      margin-top: -0.12rem;
      left: 0.06rem;
      border:0.03rem solid #fff;
      border-top: none;
      border-right: none;
      transform: rotate(-45deg);
    }
    .protocol-label {
      position: relative;
      padding-left: 0.5rem;
      display: flex;
      align-items: center;
      color: #999;
      font-size: 0.26rem;
    }
    .protocol-link {
      color: #999;
      font-size: 0.26rem;
    }
  }
</style>
