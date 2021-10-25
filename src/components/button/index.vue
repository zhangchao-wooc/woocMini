<template>
  <view class="demo-button">{{text}}</view>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
export default {
  name: 'DemoButton',
  components: {
    
  },
  setup(){
    const state = reactive({
      text: '按钮'
    });


    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss">
.demo-button {
  display: grid;
  place-items: center;
  width: 100%;
  height: 50px;
  color: #fff;
  background-color: #6600ff;
}
</style>