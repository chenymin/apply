<template>
  <div class='test-container' :style="perspectiveValue">
    <ul class="list-out" >
      <li class="item" v-for="(item, index) in arr" :style="colors[index]">{{item}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        arr: [1, 2, 3],
        perspectiveValue: `perspective: ${4 * document.body.clientWidth}px;`,
        colors: [
          {
            'background-color': 'red'
          },
          {
            'background-color': 'yellow'
          },
          {
            'background-color': 'blue'
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .test-container {
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: hidden;
    .list-out {
      width: 100%;
      height: 100%;
      position: relative;
      .item {
        position: absolute;
        display: flex;
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        justify-content: center;
        align-items: center;
        left:0
      }
    }
  }
</style>

