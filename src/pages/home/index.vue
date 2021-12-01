<template>
  <view class="home">
    <Navbar :title="'Wooc'" :bgi="bgi" color="#fff">123</Navbar>

    <view class="home-content">

    </view>    
    <Tabbar :selected="0"></Tabbar>
  </view>
</template>

<script lang="ts">
import Tabbar from '@/components/tabbar';
import Navbar from '@/components/navbar';
import Taro from '@tarojs/taro'
import { t } from '@wooc/mini-i18n'
import { onMounted, reactive, toRefs } from 'vue';

export default {
  name: 'Home',
  components: {
    Tabbar,
    Navbar
  },
  onShow() {
    Taro.setNavigationBarTitle({title: t('home')})
  },
  setup(props){
    const state = reactive({
      bgi: 'linear-gradient(to right, #6600ff, #EB4D50)'
    });

    onMounted(() => {
    });

    return {
       onMounted, ...toRefs(state)
    }
  },
}
</script>

<style lang="scss">
.home {
  height: 100vh;
  background-color: #eee;
  
  .home-content {
    padding: 10px 10px 48px;
    background-color: #eee;
  }
}
</style>
