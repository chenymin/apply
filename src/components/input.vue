<template>
  <div class="form-filed">
    <label class="label">{{props.label}}</label>
    <input class="value"
           @input="changeVal($event)"
           :max-value="props.maxValue"
           :type="props.type"
           :value="form[model]"
           :placeholder="props.placeholder"
           :readonly="props.readonly"
    />
    <slot name='input-slot'></slot>
    <span class="unit" v-if="props.unit">{{props.unit}}</span>
  </div>
</template>

<script>
  export default {
    name: 'my-input',
    data () {
      return {
        form: {
          [this.model]: this.props.value || ''
        }
      }
    },
    props: ['props', 'model'],
    methods: {
      changeVal (event) {
        // 输入时就修改 editor 设置 300ms 间隔防止卡顿
        let value = event.target.value
        this.form[this.model] = value
        // this.validInput(event.target.value)
        this.$emit('myInput', {[this.model]: event.target.value})
      },
      validInput (val) {
        for (let item in this.props.rules) {
          switch (item) {
            case 'required':
              this.isRequired(val, this.props.rules[item])
              break
            case 'number':
              this.isNumber(val, this.props.rules[item])
              break
            case 'max':
              this.isMax(val, this.props.rules[item])
              break
          }
        }
      },
      isRequired (val, obj) {
        if (!val || (val && val.toString().trim() === '')) {
          console.log(obj.message)
          return {isValid: false, message: obj.message}
        }
      },
      isNumber (val, obj) {
        const reg = new RegExp('^[0-9]*$')
        if (!reg.test(val)) {
          console.log('num' + obj.message)
          return {isValid: false, message: obj.message}
        }
      },
      isMax (val, obj) {
        if (obj && obj.value && val > obj.value) {
          console.log(obj.message)
          return {isValid: false, message: obj.message}
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form-filed {
    position: relative;
    display: flex;
    align-items: center;
    background-color: #fff;
    height: 1rem;
    padding: 0 0.3rem;
    .label {
      width: 2.6rem;
      font-size: 0.32rem;
      color: #444;
    }
    .value {
      flex: 1;
      font-size: 0.32rem;
    }
    .unit {
      font-size: 0.32rem;
      color: #444;
      width: 1rem;
      position: absolute;
      right: 0.3rem;
      top: 50%;
      margin-top: -0.2rem;
    }
  }
</style>
