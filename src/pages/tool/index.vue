<template>
  <view class="tool">
    <view class="tool-box">
      <view class="tool-box_item" 
        v-for="(item, index) in dataList" 
        :key="index" 
        @click="jump(item)"
      >
        <image class="img" lazy-load="true" aspectFill :src="item.img" alt="" />
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
import {compass,
  metronome} from '@/assets'

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
          img: metronome,
          route: 'metronome/index',
        },
        {
          name: 'tool.compass',
          img: compass,
          route: 'compass/index',
        },
      ]
    })

    const jump = (item) => {
      Taro.navigateTo({url: item.route})
    }
    
    onMounted(() => {
      console.log(compass,
  metronome);
      Taro.setNavigationBarTitle({title: ''})
    })
      
    return {jump, onMounted, ...toRefs(state)}
  }
}
</script>

<style lang="scss">
.tool {
  height: 100vh;
  background-color: #fff;
  .tool-box {
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 150px);
    grid-template-rows: repeat(auto-fill, 150px);
    grid-gap: 30px;
    .tool-box_item {
      position: relative;
      background-color: #fff;
      border-radius: 5%;
      padding: 10px;
      overflow: hidden;
      background: $shadow9-background;
      box-shadow: $primary-shadow9;
      box-sizing: border-box;
      .img {
        width: 100%;
        height: 100px;
        box-sizing: border-box;
      }
      .title {
        line-height: 30px;
        text-align: center;
        font-weight: bold;
      }
    }
  }
}

</style>