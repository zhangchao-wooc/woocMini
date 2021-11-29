<template>
  <view class="tool">
    <view class="tool-box">
      <view class="tool-box_item" 
        v-for="(item, index) in dataList" 
        :key="index" 
        @click="jump(item)"
      >
        <image class="img" lazy-load="true" :src="item.img" alt="" />
        <view class="title">{{t(item.name)}}</view>
      </view>
    </view>
    <tabbar :selected="1"></tabbar>
  </view>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue';
import { i18n, t } from '@wooc/mini-i18n'
import Taro from '@tarojs/taro'
import tabbar from '@/components/tabbar';

export default {
  components: {
    tabbar
  },
  setup () {
    const state = reactive({
      tab4value: '0',
      dataList: [
        {
          name: 'tool.metronome',
          img: '../../assets/metronome.png',
          route: 'metronome/index',
        },
      ]
    })

    const jump = (item) => {
      Taro.navigateTo({url: item.route})
    }
    
    onMounted(() => {
      Taro.setNavigationBarTitle({title: ''})
    })
      
    return {jump, onMounted, ...toRefs(state)}
  }
}
</script>

<style lang="scss">
.tool {
  height: 100vh;
  background-color: #eee;
  .tool-box {
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    .tool-box_item {
      position: relative;
      background-color: #fff;
      border-radius: 5%;
      overflow: hidden;
      box-shadow: 0 0 5px 5px rgba(0,0,0,.1);
      .img {
        padding: 5px;
        width: 100%;
        height: 150px;
        object-fit: fill;
      }
      .title {
        padding: 10px;
        text-align: center;
        font-weight: bold;
      }
    }
  }
}

</style>