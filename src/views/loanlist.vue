<template>
  <div class="loanlist-container">
    <ul class="list">
      <li class="item" v-for="(item, index) in list" @click="jumpToDetail(item)">
        <list-item :item="item"></list-item>
      </li>
    </ul>
  </div>
</template>

<script>
  import ListItem from '../components/listitem.vue'
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        list: [
          {
            amount: 500,
            createBy: '2017-08-10',
            status: 2,
            id: 1
          },
          {
            amount: 1000,
            createBy: '2017-08-11',
            status: 2,
            id: 2
          }
        ]
      }
    },
    computed: {
      ...mapGetters({
        myList: 'loanList'
      })
    },
    methods: {
      jumpToDetail ({id}) {
        this.$router.push({name: 'loandetail', params: {id}})
      },
      fetchData () {
        const proType = this.$route.params.proType
        this.$store.dispatch('fetchLoanList', Object.assign({}, {proType}))
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

