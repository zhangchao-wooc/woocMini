<template>
  <view class="home">
    <nut-searchbar
      class="searchbar"
      v-model="searchValue4" 
      background="linear-gradient(to right, #9866F0, #EB4D50)" 
      input-background="#fff"
    ></nut-searchbar>

    <view class="home-content">
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
        containerId]='scroll'
        :use-window='false'
        :has-more="hasMore"
        @load-more="loadMore"
        @refresh="refresh"
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
    <tabbar :selected="0"></tabbar>
  </view>
</template>

<script lang="ts">
import tabbar from '@/components/tabbar';
import { onMounted, reactive, ref, toRefs } from 'vue';
export default {
  name: 'Home',
  components: {
    tabbar
  },
  setup(){
    const state = reactive({
      searchValue: '',
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
          name: wx.$t('error500'),
          img: 'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
          price: '234',
          tag: []
        },
        {
          name: wx.$t('refresh'),
          img: 'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
          price: '567',
          tag: []
        },
        {
          name: wx.$t('title'),
          img: 'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
          price: '234',
          tag: []
        },
        {
          name: wx.$t('refresh'),
          img: 'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
          price: '890',
          tag: []
        },
        {
          name: wx.$t('error404'),
          img: 'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
          price: '234',
          tag: []
        },
        {
          name: wx.$t('title'),
          img: 'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
          price: '234',
          tag: []
        },
        {
          name: wx.$t('refresh'),
          img: 'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
          price: '890',
          tag: []
        },
        {
          name: wx.$t('error404'),
          img: 'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
          price: '234',
          tag: []
        }
      ]
    });

    const hasMore = ref(true);
    const loadMore = done => {  
      console.log('load');
      
      setTimeout(() => {
        const curLen = state.dataList.length;
        for (let i = curLen; i < curLen; i++) {
          state.dataList.push(state.dataList[i]);
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
    const refresh = () => {
      console.log('refresh')
    }

    onMounted(() => {
      wx.setNavigationBarTitle({title: wx.$t('home')})
    });

    return {
      refresh, loadMore, hasMore, ...toRefs(state)
    }
  }
}
</script>

<style lang="scss">
.home {
  .searchbar {
    position: sticky;
    top: 0;
    z-index: 888;
  }
  .home-content {
    padding: 10px 10px 48px;
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
}


</style>
