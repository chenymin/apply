<template>
  <div class="submitinfo-container">
    <section>
      <ul class="ul-wrap">
        <li class="item" v-for="(item, index) in info">
          <span class="left-text">{{item.label}}</span>
          <span class="right-text">{{item.value}}{{item.unit}}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    props: {
      info: {
        type: Array,
        default () {
          return []
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ul-wrap{
    .item {
      position: relative;
      display: flex;
      align-items: center;
      font-size: 0.32rem;
      color: #444;
      height: 1rem;
      padding: 0 0.3rem;
      background-color: #fff;
      overflow: hidden;
      &::after {
        position: absolute;
        content: '';
        border-bottom: 1px solid #eee;
        width: 100%;
        height: 1px;
        margin-top: -1px;
        top:100%;
        left: 0.3rem;
      }
      .right-text {
        flex: 1;
        text-align: right;
      }
    }
    .on-border {
      &::after {
        border-bottom: none;
      }
    }
  }
</style>
