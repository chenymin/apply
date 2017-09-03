<template>
  <div class="form-filed">
    <label class="label">{{props.label}}</label>
    <input class="value"
           @input="changeVal($event)"
           :type="props.type"
           :value="form[model]"
           :placeholder="props.placeholder"
    />
    <span class="unit">{{props.unit}}</span>
  </div>
</template>

<script>
  export default {
    name: 'input',
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
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.form[this.model] = event.target.value
          this.$emit('myInput', {[this.model]: event.target.value})
        }, 300)
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
      width: 2.4rem;
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
      text-align: right;
    }
  }
</style>
