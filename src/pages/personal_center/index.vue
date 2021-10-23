<template>
  <view class="personal_center">
    <nut-cell title="路由跳转 ’/‘ " to="/"></nut-cell>
  </view>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
export default {
  name: 'PersonalCenter',
  components: {
    
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
  
}
</style>
