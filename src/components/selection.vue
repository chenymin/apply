<template>
  <div class="selection-container" >
    <div class="cover-container" @click="hiddenModal" v-if="isShow">
    </div>
    <transition name="list-fade">
      <div class="select-wrap" v-if="isShow">
        <p class="title">
          <span class="remove" @click="hiddenModal"></span>
          {{title}}
        </p>
        <p class="area" v-if="selectType === 'area'">
          <span class="choice">请选择</span>
          <span class="province">{{selectVal}}</span>
        </p>
        <ul class="list">
          <li class="item" v-for="(item, index) in list" 
                          :class="{'selected': index === currentIndex}"
                          @click="selectItem(item, index)">
            {{getOptionLabel(item)}}
          </li>
        </ul>
      </div>
    </transition>  
  </div>
</template>

<script>
  export default {
    data () {
      return {
        currentIndex: -1
      }
    },
    props: {
      selectType: {
        type: String,
        default: 'area'
      },
      title: {
        type: String,
        default: '请选择期限'
      },
      isShow: Boolean,
      list: Array,
      value: {
        type: String,
        default: 'value'
      },
      label: {
        type: String,
        default: 'label'
      },
      getOptionLabel: {
        type: Function,
        default (option) {
          if (typeof option === 'object') {
            if (this.value && option[this.label]) {
              return option[this.label]
            }
          }
          return option
        }
      },
      getOptionValue: {
        type: Function,
        default (option) {
          if (typeof option === 'object') {
            if (this.value && option[this.value]) {
              return option[this.value]
            }
          }
          return option
        }
      }
    },
    computed: {
      selectVal () {
        return this.currentIndex >= 0 ? this.getOptionLabel(this.list[this.currentIndex]) : ''
      }
    },
    methods: {
      hiddenModal () {
        this.$emit('hiddenSelectModal')
      },
      selectItem (item, index) {
        this.currentIndex = index
        this.$emit('hiddenSelectModal')
        this.$emit('noticeChangeVal', item)
      }
    }
  }
</script>

<style lang="scss" scoped>
  
  .selection-container {
    .list-fade-enter-active, .list-fade-leave-active {
      transition: all 0.4s ease-out;
    }
    .list-fade-enter, .list-fade-leave-active {
      transform: translateY(7rem);
    }
    .cover-container {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #333;
      opacity: 0.8;
      z-index: 10
    }
    .select-wrap {
      position: fixed;
      width: 100%;
      bottom: 0;
      background-color: #fff;
      z-index: 11;
      .common {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1rem;
      }
      .area {
        @extend .common;
        font-size: 0.36rem;
        .choice {
          color: #444;
          padding-right: 0.8rem;
        }
        .province {
          color: #cda76e;
        }
      }
      .title {
        @extend .common;
        font-size: 0.3rem;
        color: #999;
        .remove-common {
          position: absolute;
          content: '';
          width: 0.5rem;
          height: 1px;
          background-color: currentColor;
          top: 50%;
        }
        .remove {
          position: absolute;
          left: 0.3rem;
          width: 1rem;
          height: 1rem;
          &::after {
            @extend .remove-common;
            transform: rotate(-45deg);
          }
          &::before {
            @extend .remove-common;
            transform: rotate(45deg);
          }
        }
      }
      .list {
        max-height: 6rem;
        overflow: auto;
        .item {
          @extend .common;
          position: relative;
          font-size: 0.36rem;
          color: #444;
          border-top: 1px solid #eee; 
        }
        .selected {
          color: #cda76e;
          &::after {
            position: absolute;
            content: '';
            color: #cda76e;
            width: 0.4rem;
            height: 0.2rem;
            border-bottom: solid 2px #cda76e;
            border-left: solid 2px #cda76e;
            -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
            right: 0.3rem;
            top: 50%;
            margin-top: -0.1rem;
          }
        }
      }
    }
  }
</style>
