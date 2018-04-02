<template>
  <div class="usercenter-container">
    <section class="user-info">
      <img class="header" src="../assets/header.png"/>
      <span class="mobile">{{getStore('mobile') | formatPhone}}</span>
    </section>
    <div class='no-result' v-if="!isDataResult">
      <img class="pic" src="../assets/no-data.png" alt="">
      <span class="text">暂无数据</span>
    </div>
    <ul class="loan-list" v-if="isDataResult">
      <li class="item" v-for="(item, index) in myList" :key="index">
        <p class="loan-title" @click="jumpToList(item)">
          <img class="img" :src="getImgPath(getTitleObj(item.proType).imgPath)"/>
          {{getTitleObj(item.proType).name}}
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
  import {getStore} from '../utils/storage'
  export default {
    data () {
      return {
        titleContent: {
          '01': {
            imgPath: 'item-house.png',
            name: '我的房金融'
          },
          '02': {
            imgPath: 'item-fish.png',
            name: '我的星渔贷'
          },
          '04': {
            imgPath: 'item-car.png',
            name: '我的星车贷'
          }
        }
      }
    },
    computed: {
      ...mapGetters({
        list: 'loanLatestData'
      }),
      isDataResult () {
        return this.list.length >= 1 ? 1 : 0
      },
      myList () {
        this.list.map((item) => {
          const {amount, status, createTime} = item
          const childList = _.assign({}, {amount, status, createTime})
          item.childList = childList
        })
        return this.list
      }
    },
    methods: {
      getImgPath,
      getStore,
      getTitleObj (key) {
        return this.titleContent[key]
      },
      jumpToList ({proType}) {
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