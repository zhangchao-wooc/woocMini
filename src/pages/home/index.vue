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
    
    <nut-infiniteloading
      containerId = 'scroll'
      :use-window='false'
      :has-more="hasMore"
      @load-more="loadMore"
    >
      <view class="commodity">
        <view class="commodity-box" v-for="(item, index) in dataList" :key="index">
          <img class="commodity-img" :src="item.img" alt="">
          <view class="commodity-info">
            <view class="commodity-info_name">{{item.name}}</view>
            <view class="commodity-info_tag"></view>
            <view class="commodity-info_price">
              <nut-price :price="item.price" :decimal-digits="3" :need-symbol="true" :thousands="true" />
            </view>
            <view class="commodity-info_data"></view>
          </view>
        </view>
      </view>
    </nut-infiniteloading>
  </view>
</template>

<script lang="ts">
import { onMounted, reactive, ref, toRefs } from 'vue';
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
      ],
      dataList: [
        {
          name: '123',
          img: 'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
          price: '234',
          tag: []
        },
        {
          name: '史蒂夫',
          img: 'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
          price: '567',
          tag: []
        },
        {
          name: '刚回家',
          img: 'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
          price: '234',
          tag: []
        },
        {
          name: '啥地方',
          img: 'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
          price: '890',
          tag: []
        },
        {
          name: '俄方你不好',
          img: 'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
          price: '234',
          tag: []
        }
      ]
    });

    const hasMore = ref(true);
    const loadMore = done => {  
      setTimeout(() => {
        const curLen = state.dataList.length;
        for (let i = curLen; i < curLen + 10; i++) {
          state.dataList.push(`${i}`);
        }
        if (state.dataList.length > 30) hasMore.value = false;
        done()
      }, 500);
    };
    // const init = () => {
    //   for (let i = 0; i < 10; i++) {
    //     state.dataList.push(`${i}`);
    //   }
    // }

    onMounted(() => {
      // init()
    });

    return {
      loadMore, hasMore, ...toRefs(state)
    }
  }
}
</script>

<style lang="scss">
.home {
  padding: 0 10px;
  background-color: #eee;
  .swiper-img {
    width: 100%;
  }
  .commodity {
    margin-top: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    .commodity-box {
      background-color: #fff;
      border-radius: 5%;
      overflow: hidden;
      .commodity-img {
        width: 100%;
        height: 150px;
        object-fit: fill;
      }
      .commodity-info {
        padding: 5px;
      }
    }
  }
}

</style>
