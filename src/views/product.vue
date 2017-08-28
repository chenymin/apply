<template>
  <div class="product-container" id="iSlider-wrapper" :style="perspectiveValue">
    <ul class="list-out">
      <li v-for="(item, index) in productListData" class="item-out" 
      :style="getStyle(index)" 
      :class='getClass(index)'
      @touchstart="touchStart($event)" 
      @touchmove.prevent="touchMove($event)" 
      @touchend="touchEnd($event)" :id='index'>
        <section class='img-wrap'>
          <img class="img" :src="getImgPath(item.imgName)">
        </section>
        <section class='product-des'>
          <ul class="list">
            <li class="item" v-for="childItem in item.detail">
              <img class="item-img" :src="getImgPath(childItem.imgPath)" alt="">
              <p class="item-content">
                <strong class="big-txt">{{childItem.bigText}}</strong>
                <span class="small-txt">{{childItem.smallText}}</span>
              </p>
            </li>
          </ul>
        </section>
        <section class="foot">
          <p class="des">
            {{item.productDes}}
          </p>
          <p class="try-people">
            <span class="text">{{item.proper}}</span>
          </p>
        </section>
        <button class="primary-button button-bottom" @click.stop="applyLoan(item.title)">立即申请</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ISlider from 'islider.js'

export default {
  data () {
    return {
      styles: [
        `transform: scale(0.9, 0.9) translateZ(0px) translateX(0px) rotateY(0deg); 
         `,
        `transform: scale(0.9, 0.9) translateZ(-150px) translateX(${document.body.clientWidth}px) rotateY(-30deg);
         `,
        `transform: scale(0.9, 0.9) translateZ(-150px) translateX(${document.body.clientWidth}px) rotateY(30deg);
         `
      ],
      perspectiveValue: `perspective: ${4 * document.body.clientWidth}px;`,
      timer: 0,
      currentIndex: 0,
      nextIndex: 0,
      preIndex: 0,
      startX: 0,
      startTime: 0,
      movePercent: 0,
      isStart: false,
      isMove: false,
      isMoveEnd: false,
      timerOut: false
    }
  },
  computed: {
    ...mapGetters([
      'productListData'
    ]),
    list () {
    }
  },
  methods: {
    getImgPath (name) {
      return require(`../assets/${name}`)
    },
    getStyle (index) {
      console.log(this.styles[index])
      return index < 2 ? this.styles[index] : this.styles[0]
    },
    getClass (index) {
      const currentClass = ['islider-active', 'islider-next', 'islider-pre']
      if (this.currentIndex % 3 === 0) {
        return currentClass
      }
    },
    applyLoan ({ label, value }) {
      console.log(`${label}--${value}`)
    },
    touchStart (event) {
      console.log('touchStart')
      const events = event.touches[0] || event
      if (!this.timerOut) {
        this.startTime = new Date().getTime()
        this.isStart = true
        this.isMove = true
        // 水平位置标记
        this.startX = events.pageX
      }
    },
    touchMove (event) {
      console.log('touchMove')
      if (this.isMove) {
        const events = event.touches[0] || event
        let distanceX = events.pageX - this.startX
        this.movePercent = (distanceX / document.body.clientWidth) * 100
        console.log(distanceX)
        // $('.item-out').first().css({
        //   transform: `translateX(${distanceX}px)`
        // })
      }
    },
    touchEnd (event) {
      console.log('touchEnd')
    }
  },
  created () {
    console.log(ISlider)
    console.log($)
    /* eslint-disable no-new */
    // setTimeout(() => {
    //   new ISlider({
    //     dom: document.getElementById('iSlider-wrapper'),
    //     data: [
    //       {
    //         content: document.getElementById('0')
    //       },
    //       {
    //         content: document.getElementById('1')
    //       }
    //     ],
    //     animateTime: 800,
    //     animateType: 'flow',
    //     isAutoplay: 1
    //   })
    // }, 500)
  }
}
</script>

<style lang="scss" scoped>
.product-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .list-out {
    .item-out {
      display: flex;
      position: absolute;
      flex-direction: column;
      background: #fff;
      overflow: hidden;
      .img-wrap {
        height: 3.5rem;
        margin-bottom: 0.2rem;
        .img {
          width: 100%;
          height: 3.5rem;
        }
      }
      .product-des {
        .item {
          display: flex;
          padding: 0.24rem 0.3rem;
          .item-img {
            width: 0.4rem;
            height: 0.4rem;
          }
          .item-content {
            display: flex;
            flex-direction: column;
            padding-left: 0.3rem;
            .big-txt {
              font-size: 0.3rem;
            }
            .small-txt {
              font-size: 0.24rem;
              color: #999;
              margin-top: 0.05rem;
            }
          }
        }
      }
    }
    .foot {
      display: flex;
      flex-direction: column;
      margin: 0 0.3rem;
      padding: 0.3rem 0;
      border-top: 1px solid #eee;
      .des {
        font-size: 0.22rem;
        color: #999;
      }
      .try-people {
        display: flex;
        .text {
          background-color: #f5ede2;
          color: #cda76e;
          font-size: 0.22rem;
          padding: 0.05rem 0.2rem;
          border-radius: 2px;
        }
      }
    }
    .button-bottom {
      margin-bottom: 0.5rem;
    }
  }
}
</style>
