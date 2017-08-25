<template>
  <div class="product-container" id="iSlider-wrapper">
    <ul class="list-out">
      <li v-for="(item, index) in productListData" class="item-out" 
      @touchstart="touchStart($event)"
      @touchmove.prevent="touchMove($event)"
      @touchend="touchEnd($event)">
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
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {}
    },
    computed: {
      ...mapGetters([
        'productListData'
      ])
    },
    methods: {
      getImgPath (name) {
        return require(`../assets/${name}`)
      },
      applyLoan ({label, value}) {
        console.log(`${label}--${value}`)
        return
      },
      touchStart (event) {
        console.log('touchStart')
      },
      touchMove (event) {
        console.log('touchMove')
      },
      touchEnd (event) {
        console.log('touchEnd')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .product-container {
    position: absolute;
    perspective: 4rem;
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
