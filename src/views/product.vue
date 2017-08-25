<template>
  <div class="product-container" id="iSlider-wrapper">
    <ul class="list-out">
      <li class="item-out" style="z-index: 203;
    transform: scale(0.9, 0.9) translateZ(0px) translateX(0px) rotateY(0deg);
    transition: -webkit-transform 800ms ease;">
        <section class='img-wrap'>
          <img class="img" src="../assets/product-xingyu.jpg">
        </section>
        <section class='product-des'>
          <ul class="list">
            <li class="item">
              <img class="item-img" src="../assets/item-one.png" alt="">
              <p class="item-content">
                <strong class="big-txt">额度高</strong>
                <span class="small-txt">最高可贷500万</span>
              </p>
            </li>
            <li class="item">
              <img class="item-img" src="../assets/item-two.png" alt="">
              <p class="item-content">
                <strong class="big-txt">随借随还</strong>
                <span class="small-txt">循环额度,1年有效</span>
              </p> 
            </li>
            <li class="item">
              <img class="item-img" src="../assets/item-three.png" alt="">
              <p class="item-content">
                <strong class="big-txt">额度高</strong>
                <span class="small-txt">最高可贷500万</span>
              </p>
            </li>
          </ul>
        </section>
        <section class="foot">
          <p class="des">
            渔业产品质押类贷款产品，最高可获得500万贷款额度，期限最长90天
          </p>
          <p class="try-people">
            <span class="text">适用人群:华彩找渔网卖家尊享</span>
          </p>
        </section>
        <button class="primary-button button-bottom">立即申请</button>
      </li>

      <li class="item-out" style="z-index: 0; transform: scale(0.9, 0.9) translateZ(-1.5rem) translateX(4rem) rotateY(-30deg);">
        <section class='img-wrap'>
          <img class="img" src="../assets/product-xingyu.jpg">
        </section>
        <section class='product-des'>
          <ul class="list">
            <li class="item">
              <img class="item-img" src="../assets/item-one.png" alt="">
              <p class="item-content">
                <strong class="big-txt">额度高</strong>
                <span class="small-txt">最高可贷500万</span>
              </p>
            </li>
            <li class="item">
              <img class="item-img" src="../assets/item-two.png" alt="">
              <p class="item-content">
                <strong class="big-txt">随借随还</strong>
                <span class="small-txt">循环额度,1年有效</span>
              </p> 
            </li>
            <li class="item">
              <img class="item-img" src="../assets/item-three.png" alt="">
              <p class="item-content">
                <strong class="big-txt">额度高</strong>
                <span class="small-txt">最高可贷500万</span>
              </p>
            </li>
          </ul>
        </section>
        <section class="foot">
          <p class="des">
            渔业产品质押类贷款产品，最高可获得500万贷款额度，期限最长90天
          </p>
          <p class="try-people">
            <span class="text">适用人群:华彩找渔网卖家尊享</span>
          </p>
        </section>
        <button class="primary-button button-bottom">立即申请</button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
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
