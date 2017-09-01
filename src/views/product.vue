<template>
  <div class="product-container" id="iSlider-wrapper" :style="perspectiveValue">
    <ul class="list-out" >
      <li v-for="(item, index) in productListData" class="item-out" :id='index'>
        <div class="item-out-child">
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
          <button class="primary-button button-bottom" @click="jumpToApply(item.title)">立即申请</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import ISlider from 'islider.js'
import {setStore} from '../utils/storage'

export default {
  data () {
    return {
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
    jumpToApply ({type}) {
      setStore('site', this.$route.params.site)
      setStore('sysSite', type)
      this.$store.commit('GET_CURRENT_DATA', {type})
      this.$router.push({name: 'basicinfo'})
    }
  },
  created () {
    console.log(ISlider)
    /* eslint-disable no-new */
    setTimeout(() => {
      const nodeList = []
      const list = [...Array.from($('.item-out-child'))]
      list.forEach((item) => {
        nodeList.push(Object.assign({}, {content: item}))
      })
      const iSlider = new ISlider({
        dom: document.getElementById('iSlider-wrapper'),
        data: nodeList,
        isLooping: 1,
        animateTime: 800,
        animateType: 'flow',
        // isAutoplay: 1,
        fillSeam: true
      })
      console.log($('.list-out'))
      $('.list-out').remove()
      iSlider.on('slideChanged', function () {
        // console.log($('.islider-active'))
        // $('.islider-active').css({
        //   transform: 'scale(0.95, 0.95) translateZ(0px) translateX(0px) rotateY(0deg)'
        // })
      })
    }, 500)
  }
}
</script>

<style lang="scss" scoped>
.product-container {
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
  .item-out-child {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    .img-wrap {
      height: 3.5rem;
      margin-bottom: 0.2rem;
      overflow: hidden;
      .img {
        width: 100%;
        height: 3.5rem;
      }
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
</style>
