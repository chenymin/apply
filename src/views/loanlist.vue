<template>
  <div class="loanlist-container">
    <ul class="list">
      <li class="item">
        <list-item></list-item>
      </li>
      <li class="item">
        <list-item></list-item>
      </li>
    </ul>
  </div>
</template>

<script>
  import listItem from '../components/listitem.vue'
  export default {
    data () {
      return {
      }
    },
    components: {
      listItem
    }
  }
</script>

<style lang="scss" scoped>
    .loanlist-container {
      .list {
        .item {
          padding: 0 0.3rem;
          background-color: #fff;
          margin-top: 0.3rem;
        }
      }
    }
</style>

