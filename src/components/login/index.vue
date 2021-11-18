<template>
  <nut-popup
    position="bottom"
    closeable
    round
    @close="close"
    :style="style"
    v-model:visible="show"
  >
    <!-- <image src=""> -->
    <view class="loginTitle"></view>
    <nut-button block type="primary" @click="login">微信登录</nut-button>
    <view class="protocol">隐私协议</view>
  </nut-popup>
</template>

<script>
import { onMounted, onBeforeMount, reactive, toRefs } from 'vue';
import Taro from '@tarojs/taro'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    callback: {
      type: Function
    }
  },
  setup (props) {
    const state = reactive({
      show: false,
      style: { 
        height: '30%', 
        display: 'grid', 
        placeItems: 'center',
        padding: '0 15px',
        boxSizing: 'border-box'
      },
    })

    onMounted(() => {
      state.show = props.show
    })

    function close (res) {
      props.callback(res)
      state.show = false
    }

    function login () {
      Taro.getUserProfile({
        desc: '获取您的用户信息!',
        success: (res) => {
          Taro.setStorageSync('userInfo', res)
          close(res)
        }
      })
    }

    return {close, login, onMounted, ...toRefs(state)}
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: grid;
  place-items: center;
}
</style>