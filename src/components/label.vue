<template>
  <p class="part">{{props.label}}</p>
</template>

<script>
  export default {
    props: ['props']
  }
</script>

<style lang="scss" scoped>
  .part {
    display: flex;
    align-items: center;
    height: 0.6rem;
    font-size: 0.26rem;
    color: #999;
    padding-left: 0.3rem;
  }
</style>
