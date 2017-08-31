<template>
  <div class="usercenter-container">
    <section class="user-info">
      <img class="header" src="../assets/header.png"></img>
      <span class="mobile">{{'13232145678' | formatPhone}}</span>
    </section>
    <div class='no-result' v-if="isDataResult">
      <img class="pic" src="../assets/no-data.png" alt="">
      <span class="text">暂无数据</span>
    </div>
    <ul class="loan-list" v-if="!isDataResult">
      <li class="item" v-for="(item, index) in list">
        <p class="loan-title" @click="jumpToList(item)">
          <img class="img" :src="getImgPath(item.imgPath)"/>
          {{item.name}}
        </p>
        <list-item :item='item.childList'></list-item>
      </li>
    </ul>
  </div>
</template>

<script>
  import ListItem from '../components/listitem.vue'
  import {getImgPath} from '../utils/util'
  import {mapGetters} from 'vuex'
  import _ from 'lodash'
  export default {
    data () {
      return {
        list: [
          {
            imgPath: 'item-fish.png',
            name: '我的房金融',
            proType: '01',
            childList: {
              amount: 500,
              createBy: '2017-08-10',
              status: 2
            }
          },
          {
            imgPath: 'item-house.png',
            name: '我的星渔贷',
            proType: '02',
            childList: {
              amount: 1000,
              createBy: '2017-08-09',
              status: 1
            }
          }
        ]
      }
    },
    computed: {
      ...mapGetters({
        lastData: 'loanLatestData'
      }),
      isDataResult () {
        let isResult = true
        for (let i = 0; i < this.list.length; i++) {
          const {childList} = this.list[i]
          if (!_.isEmpty(childList)) {
            isResult = false
            break
          }
        }
        return isResult
      }
    },
    methods: {
      getImgPath,
      jumpToList ({proType}) {
        console.log(proType)
        this.$router.push({name: 'loanlist', params: {proType}})
      },
      fetchData () {
        this.$store.dispatch('fetchLoanLastData')
      }
    },
    components: {
      ListItem
    },
    created () {
      this.fetchData()
    }
  }
</script>

<style lang="scss">
  @import "../scss/var";
  .usercenter-container {
    .user-info {
      display: flex;
      align-items: center;
      height: 2.5rem;
      background-image: url('../assets/user-bg.jpg');
      background-position: center;
      background-size: cover;
      padding-left: $padding-left;
      .header {
        width: 1.32rem;
        height: 1.32rem;
        border-radius: 50%; 
      }
      .mobile {
        color: #fff;
        font-size: $primary-font-size;
        padding-left: $padding-left;
      } 
    }
    .no-result {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 1rem 0;
      .pic {
        width: 1.2rem;
        height: 1.1rem;
      }
      .text {
        color: #333;
        font-size: .28rem;
      }
    }
    .loan-list {
      .item {
        padding: 0 $padding-left;
        background-color: #fff;
        margin-bottom: 0.3rem;
        .loan-title {
          display: flex;
          align-items: center;
          position: relative;
          font-size: 0.3rem;
          padding: 0.29rem 0;
          border-bottom: 1px solid $form-border-color;
          .img {
            width: 0.5rem;
            height: 0.5rem;
            margin-right: 0.3rem;
          };
          &::after {
            content: '';
            position: absolute;
            right: 5px;
            width: 12px;
            height: 12px;
            border-bottom: solid 2px #ccc;
            border-right: solid 2px #ccc;
            transform: rotate(-45deg);
            top: 50%;
            margin-top: -6px;
          }
        }
      }
    }
  }
</style>