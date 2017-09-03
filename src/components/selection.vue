<template>
  <div class="selection-container">
    <div class="cover-container" @touchmove.prevent @click.stop="hiddenSelect" v-if="isShow">
    </div>
    <div class="form-filed" @click="showSelect">
      <label class="label">{{props.title}}</label>
      <span class="select-com">{{selectVal}}</span>
    </div>
    <transition name="list-fade">
      <div id="mySelect" class="select-wrap" v-if="isShow">
        <p class="title">
          <span class="remove" @click="isShow=false"></span>
          {{props.title}}
        </p>
        <p class="area" v-if="props.selectType === 'area'">
          <span class="choice">请选择</span>
          <span class="province">{{selectVal}}</span>
        </p>
        <ul class="list">
          <li class="item" v-for="(item, index) in props.list"
                          :class="{'selected': (index === props.defaultVal - 1 || index === currentIndex) && props.selectType!=='area'}"
                          @click="selectItem(item, index)">
            {{getOptionLabel(item)}}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
  import smartScrolls from '../utils/smartScroll'
  export default {
    data () {
      return {
        currentIndex: -1,
        isShow: this.props.isShowSelect || false,
        selectVal: ''
      }
    },
    props: ['props', 'model'],
    methods: {
      getDetaultVal () {
        const index = this.props.defaultVal - 1
        const item = this.props.list[index]
        return this.getOptionLabel(item)
      },
      getOptionValue (option) {
        if (typeof option === 'object') {
          if (this.props.value && option[this.props.value]) {
            return option[this.props.value]
          }
        }
        return option
      },
      getOptionLabel (option) {
        if (typeof option === 'object') {
          if (this.props.value && option[this.props.label]) {
            return option[this.props.label]
          }
        }
        return option
      },
      hiddenSelect () {
        this.isShow = false
        $('html').removeClass('noscroll')
        Array.from($('.selection-container')).forEach((item) => {
          $(item).off()
        })
      },
      showSelect () {
        if (!this.props.isTriggerClick) {
          this.isShow = false
          return
        }
        $('html').addClass('noscroll')
        console.log($('.selection-container')[0])
        Array.from($('.selection-container')).forEach((item) => {
          smartScrolls($(item), '.list')
        })
        this.isShow = true
      },
      selectItem (item, index) {
        this.currentIndex = index
        this.isShow = false
        this.selectVal = this.getOptionLabel(item)
        console.log(item)
        this.$emit('mySelect', {[this.model]: this.getOptionValue(item)})
      }
    },
    created () {
      this.selectVal = this.getDetaultVal()
      this.$nextTick(() => {
//        console.log(this.$refs.mySelect)
      })
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
    .form-filed {
      position: relative;
      display: flex;
      align-items: center;
      background-color: #fff;
      height: 1rem;
      padding: 0 0.3rem;
      .select-com {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        font-size: 0.32rem;
        color: #444;
        margin-right: 0.3rem;
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
           right: 0.3rem;
         }
      }
    }
    .cover-container {
      position: absolute;
      top:0;
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
