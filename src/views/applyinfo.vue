<template>
  <div class="applyinfo-container">
    <section class="baseinfo-form">
      <form class='form-wrap' @submit.prevent="applyInfoSubmit()">
        <factory :factor="applyInfo"></factory>
        <p class="protocol">
          <label class="protocol-label">
            <input type="checkbox" checked="checked" name="protocol" value="">
            我已阅读并同意，《个人线上借款协议》
          </label>
        </p>
        <button class='primary-button'>提交申请</button>
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
        }
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
      height: 40px;
      line-height: 40px;
      padding-left: 20px;
    }
    .protocol-label{
      display: flex;
      align-items: center;
      color: #999;
      font-size: 0.26rem;
    }
  }
</style>
