<template>
  <div class="confirm-container" v-if="isShowConfirm">
    <div class="cover-container" @click.stop="cancleModal">
    </div>
    <div class="content-container">
      <div class="content">
        <p class="text">{{text}}</p>
        <slot name="btn-group">
          <p class="btn-group">
            <button class="button-common cancle" @click.stop="cancleModal">取消</button>
            <button class="button-common confirm" @click.stop="confirm">确定</button>
          </p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isShowConfirm: this.isShow
      }
    },
    props: {
      isShow: {
        type: Boolean,
        default: false
      },
      text: {
        type: String,
        default: '确定申请提前还款'
      }
    },
    methods: {
      confirm () {
        this.eventBus.$emit('confirm/ok')
      },
      cancleModal () {
        this.isShowConfirm = false
      },
      showCofirm () {
        this.isShowConfirm = true
      }
    },
    created () {
      this.$on('showModal', this.showConfirmModal)
      this.eventBus.$on('confirm/show', this.showCofirm)
    }
  }
</script>

<style lang="scss" scoped>
  .cover-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #333;
    opacity: 0.8;
    z-index: 10
  }

  .content-container {
    position: absolute;
    top: 50%;
    z-index: 11;
    padding: 0 1rem;
    width: 100%;
    .content {
      background-color: #fff;
      border-radius: 8px;
       margin-top: -1.25rem;
      .text {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.3rem;
        color: #333;
        text-align: center;
        height: 1.6rem;

      }
      .btn-group {
        display: flex;
        .button-common {
          flex: 1;
          height: 0.9rem;
          border-top: 1px solid #eee;
        }
        .cancle {
           border-right: 1px solid #eee;
        }
      }
    }
  }
</style>


