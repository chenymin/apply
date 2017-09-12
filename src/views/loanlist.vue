<template>
  <div class="loanlist-container">
    <ul class="list">
      <li class="item" v-for="(item, index) in myList" @click="jumpToDetail(item)">
        <list-item :item="item"></list-item>
      </li>
    </ul>
  </div>
</template>

<script>
  import ListItem from '../components/listitem.vue'
  import {mapGetters} from 'vuex'
  import {setTitle, getTitle} from '../utils/util'
  export default {
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters({
        myList: 'loanList'
      })
    },
    methods: {
      jumpToDetail ({id}) {
        const proType = this.$route.params.proType
        this.$router.push({name: 'loandetail', params: {id, type: proType}})
      },
      fetchData () {
        const proType = this.$route.params.proType
        this.$store.dispatch('fetchLoanList', {proType})
      }
    },
    components: {
      ListItem
    },
    created () {
      const proType = this.$route.params.proType
      setTitle(`我的${getTitle(proType)}`)
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

