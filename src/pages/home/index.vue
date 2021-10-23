<template>
  <view class="home">
    <swiper
      indicator-color='#999'
      indicator-active-color='#333'
      :circular="true"
      :indicator-dots="true"
      :autoplay="true"
    >
      <swiper-item v-for="item in swiperList" :key="item.name">
        <img :src="item.img" class="swiper-img" />
      </swiper-item>
    </swiper>
    <view>
    </view>
  </view>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
export default {
  name: 'Home',
  components: {
    
  },
  setup(){
    const state = reactive({
      swiperList: [
        {
          img: 'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
          name: '第一张'
        },
        {
          img: 'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
          name: '第二张'
        },
        {
          img: 'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
          name: '第三张'
        }
      ]
    });

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss">
.home {
  padding: 0 10px;
}
.swiper-img {
  width: 100%;
}
</style>
