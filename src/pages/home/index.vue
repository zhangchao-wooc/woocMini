<template>
  <view class="home">
    <!-- <view class="home-header"></view> -->
    <view class="searchbar">
      <text class="header">WOOC</text>
      <nut-searchbar
        v-model="searchValue4"
        background="transparent" 
        input-background="#fff"
      >
        <template v-slot:rightin>
          <nut-icon size="14" name="search2"></nut-icon>
        </template>
      </nut-searchbar>
    </view>

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
              <view class="commodity-info_name">{{t(`${item.name}`)}}</view>
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
  onShow() {
      wx.setNavigationBarTitle({title: wx.$t('home')})
  },
  setup(){
    const state = reactive({
      safeArea: {},
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
          name: 'error500',
          img: 'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
          price: '234',
          tag: []
        },
        {
          name: 'refresh',
          img: 'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
          price: '567',
          tag: []
        },
        {
          name: 'home',
          img: 'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
          price: '567',
          tag: []
        },
        {
          name: 'localeProvider',
          img: 'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
          price: '234',
          tag: []
        },
        {
          name: 'shoppingCart',
          img: 'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
          price: '567',
          tag: []
        },
        {
          name: 'back_to_home',
          img: 'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
          price: '567',
          tag: []
        },
        {
          name: 'home',
          img: 'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
          price: '567',
          tag: []
        },
        {
          name: 'localeProvider',
          img: 'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
          price: '234',
          tag: []
        },
        {
          name: 'shoppingCart',
          img: 'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
          price: '567',
          tag: []
        },
        {
          name: 'back_to_home',
          img: 'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
          price: '567',
          tag: []
        },
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
    const t = (id) => {
      return wx.$t(id)
    }
    onMounted(() => {
      console.log();
      const info = wx.getMenuButtonBoundingClientRect()
      const t = document.getElementsByClassName('header')[0]
      t.style.top = info.top + 'px'
      t.style.lineHeight = info.height + 'px'
      wx.getSystemInfoAsync({
        success: res => {
          console.log(res);
        state.safeArea = res.safeArea
        const { top, bottom} = state.safeArea
        const t1 = document.getElementsByClassName('searchbar')[0]
        
        t1.style.paddingTop = top + 60 + 'px'
        // t1.style.top = (top + 5) * -1 + 'px'
        }
      })
    });

    return {
      t, onMounted, refresh, loadMore, hasMore, ...toRefs(state)
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
    background-image: linear-gradient(to right, #6600ff, #EB4D50);
    .header {
      position: fixed;
      top: 0;
      left: 15px;
      color: #fff;
      font-weight: bold;
    }
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
