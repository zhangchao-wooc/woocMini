<template>
  <view class="personal_center">
    <view class="personal-info">
      <nut-avatar bg-color="#fff" size="large" icon="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"></nut-avatar>
      <view class="nickname">123</view>
      <nut-icon class="icon" name="right"></nut-icon>
    </view>
    <demo-button></demo-button>
  </view>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import button from '../../components/button';
export default {
  name: 'PersonalCenter',
  components: {
   'demo-button': button
  },
  setup(){
    const state = reactive({
      msg: '欢迎使用 NutUI3.0 开发小程序',
      msg2: '你成功了～',
      type: 'text',
      show: false,
      cover: false
    });

    const handleClick = (type: string, msg: string, cover: boolean = false) => {
      state.show = true;
      state.msg2 = msg;
      state.type = type;
      state.cover = cover;
    };

    return {
      ...toRefs(state),
      handleClick
    }
  }
}
</script>

<style lang="scss">
.personal_center {
  .personal-info {
    position: relative;
    display: flex;
    align-items: center;
    .nickname {
      margin-left: 20px;
      font-size: 25px;
      font-weight: bold;
    }
    .icon {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translate(0, -50%);
    }
  }
}
</style>
