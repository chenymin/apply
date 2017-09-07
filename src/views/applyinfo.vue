<template>
  <div class="applyinfo-container">
    <section class="baseinfo-form">
      <form class='form-wrap' @submit.prevent="applyInfoSubmit()">
        <factory :factor="applyInfo"></factory>
        <p class="protocol">
          <input type="checkbox" id="checkbox" checked="checked" name="protocol" value="0" v-model="protocolChecked" class="check-box">
          <label class="protocol-label" for="checkbox">
            我已阅读并同意，《个人线上借款协议》
          </label>
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
  import factory from '../components/factory/factory'
  export default {
    mixins: [myMixin],
    data () {
      return {
        msg: {
          amount: '请输入申请金额',
          comName: '请输入企业名称',
          comLicense: '请输入用营业执照',
          address: '请填写详细经营地址',
          city: '请选择省份'
        },
        myForm: {
          type: '',
          repayType: '',
          mail: '',
          houseAddress: ''
        },
        protocolChecked: 1
      }
    },
    computed: {
      ...mapGetters([
        'currentData', 'applyEdit'
      ]),
      applyInfo () {
        return this.currentData[this.getPathKey()]
      }
    },
    methods: {
      applyInfoSubmit () {
        const router = this.$router
        const type = getStore('sysSite')
        const param = _.assign({}, this.applyEdit, {type})
        const {validSuccse, message} = this.validForm(this.applyEdit, this.msg)
        if (!validSuccse) {
          this.showToast(message)
          return
        }
        if (type === '02' && this.applyEdit['amount'] > 500 || type === '01' && this.applyEdit['amount'] > 1000) {
          this.showToast('您输入的金额超过最大值')
          return
        }
        if (!this.protocolChecked) {
          this.showToast('请勾选个人线上借款协议')
          return
        }
        this.$store.dispatch('addLoanApply', {param, router})
      },
      load () {
        this.$store.commit('bindDefaultValue', this.getPathKey())
      }
    },
    components: {
      factory
    },
    created () {
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
      display: inline-block;
      text-align: center;
      vertical-align: middle;
      line-height: 0.4rem;
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
      top: 0.35rem;
      left: 0.06rem;
      border:0.03rem solid #fff;
      border-top: none;
      border-right: none;
      transform: rotate(-45deg);
    }
    .protocol-label {
      position: absolute;
      top: 0;
      padding-left: 0.5rem;
      display: flex;
      align-items: center;
      color: #999;
      font-size: 0.26rem;
    }
  }
</style>
