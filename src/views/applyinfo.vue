<template>
  <div class="applyinfo-container">
    <select-modal 
      :is-show="isSelect" 
      v-on:hiddenSelectModal="hideSelectModal"
      v-on:noticeChangeVal="getSelectVal"
      :list="list"
      :select-type="selectType"
      >
    </select-modal>
    <section class="baseinfo-form">
      <form class='form-wrap'>
        <p class="part">贷款信息</p>
        <div class="form-filed">
          <label class="label">申请金额</label>
          <input class="value" type='tel' placeholder="最高可申请500万"/>
          <span class="unit">万元</span>
        </div>
        <div class="form-filed on-border">
          <label class="label">贷款期限</label>
          <span class="term">90天</span>
        </div>

        <p class="part">企业信息</p>
        <div class="form-filed">
          <label class="label">企业名称</label>
          <input class="value" type='tel' placeholder="请填写您企业的名称"/>
        </div>
        <div class="form-filed on-border">
          <label class="label">营业执照号</label>
          <input class="value" type='tel' placeholder="营业执照号/社会统一信用代码"/>
        </div>

        <p class="part">经营地址</p>
        <div class="form-filed">
          <label class="label">所在省份</label>
          <span class="select-com" @click="isSelect = !isSelect">{{selectValue}}</span>
        </div>
        <div class="form-filed on-border">
          <label class="label">详细地址</label>
          <input class="value" type='tel' placeholder="请填写详细经营地址"/>
        </div>
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
  import SelectModal from '../components/selection.vue'
  export default {
    data () {
      return {
        isSelect: false,
        selectValue: '',
        selectType: 'area',
        list: [
          '北京',
          '上海',
          '南京'
        ]
      }
    },
    methods: {
      hideSelectModal () {
        this.isSelect = false
      },
      getSelectVal (val) {
        console.log('getSelectVal' + val)
        this.selectValue = val
      }
    },
    components: {
      SelectModal
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