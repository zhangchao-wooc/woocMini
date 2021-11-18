<template>
  <view class="tool">
    
    <tabbar :selected="1"></tabbar>
  </view>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue';
import Taro from '@tarojs/taro'
import tabbar from '@/components/tabbar';

export default {
  components: {
    tabbar
  },
  setup () {
    const state = reactive({
      tab4value: '0',
    })
    
    onMounted(() => {
      Taro.setNavigationBarTitle({title: ''})
    })
      
    return {onMounted, ...toRefs(state)}
  }
}
</script>

<style>

</style>