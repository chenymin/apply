<template>
  <div class="product-container home-container">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, index) in productListData" :key="index">
        <div class="item-out-child">
          <section class='img-wrap'>
            <img class="img" :src="getImgPath(item.imgName)">
          </section>
          <section class='product-des'>
            <ul class="list">
              <li class="item" v-for="(childItem, index) in item.detail" :key="index">
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
          <button class="apply-button primary-button button-bottom">立即申请</button>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {setStore} from '../utils/storage'

export default {
  data () {
    return {
      swiperOption: {
        speed: 1000,
        autoplayDisableOnInteraction: false,
        loop: true,
        centeredSlides: true, // 自动居中
        direction: 'horizontal',
        slidesPerView: 'auto',
        watchSlidesProgress: true,
        preventClicksPropagation: false,
        onProgress: function (a) {
          let b, c, d, es
          for (b = 0; b < a.slides.length; b++) {
            c = a.slides[b]
            d = c.progress
            es = c.style
            es.opacity = 1 - Math.min(Math.abs(d / 2), 1)
          }
        },
        onSetTransition: function (a, b) {
          let es
          for (let c = 0; c < a.slides.length; c++) {
            es = a.slides[c].style
            es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = b + 'ms'
          }
        }
      }
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
    setTimeout(function () {
      $('.apply-button').on('click', function (e) {
        console.log('--->')
      })
    }, 200)
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  .swiper-container {
    width: 100%;
    margin: 0.85rem 0;
  .swiper-slide {
    width: 80%;
    transition: transform 1.0s;
    transform: scale(0.9);
    &.swiper-slide-active,
    &.swiper-slide-duplicate-active {
       -webkit-transform: scale(1);
       transform: scale(1);
     }
  }
  }
}
.product-container {
  background-color: #333;
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
