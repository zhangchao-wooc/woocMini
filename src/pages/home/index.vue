<template>
  <view class="home">
    <Navbar :title="'Wooc'" :bgi="bgi" color="#fff">123</Navbar>

    <nut-searchbar
      class="searchbar"
      v-model="searchValue"
      :placeholder="t('home.searchBar')"
      :background="bgi" 
      input-background="#fff"
    >
      <template v-slot:rightin>
        <nut-icon size="14" name="search2"></nut-icon>
      </template>
    </nut-searchbar>
    
    <view class="home-content">
      <view class="home-content-bg">

      </view>
      <swiper
        class='swiper'
        indicator-color='#999'
        indicator-active-color='#333'
        :circular="true"
        :indicator-dots="true"
        :autoplay="true"
      >
        <swiper-item v-for="item in swiperList" :key="item.url">
          <img style="width: 100%;" :src="item.url" alt="">
        </swiper-item>
      </swiper>

      <!-- 商品列表 -->
      <view class="commodity">
        <view class="commodity-item" v-for="item in commodityList" :key="item.title">
          <img :src="item.img" alt="">
          <view class="commodity-info">
            <view class="commodity-title">{{t(item.title)}}</view>
            <view class="commodity-price">
              <nut-price :price="item.price" :symbol="t('home.commodity.priceSymbol')" size="large" :thousands="true" />
            </view>
            <view class="commodity-number">{{t('home.commodity.stock')}} {{item.num}}</view>
          </view>
        </view>
      </view>
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
      bgi: 'linear-gradient(to right, #6600ff, #EB4D50)',
      searchValue: '',
      swiperList: [
        {
          url: 'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
        },
        {
          url: 'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
        },
        {
          url: 'https://storage.360buyimg.com/jdc-article/fristfabu.jpg',
        },
      ],
      commodityList: [
        {
          title: 'home.commodity.commodity1',
          price: '1',
          img: 'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
          num: '1'
        },
        {
          title: 'home.commodity.commodity2',
          price: '2',
          img: 'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
          num: '2'
        },
        {
          title: 'home.commodity.commodity3',
          price: '3',
          img: 'https://storage.360buyimg.com/jdc-article/fristfabu.jpg',
          num: '3'
        },
      ]
    });

    onMounted(() => {
      const t1 = document.getElementsByClassName('searchbar')[0]
      const t = document.getElementsByClassName('home-content')[0]

      Taro.getSystemInfo({
        success: res => {
        // @ts-ignore
        t1.style.top = res.safeArea.top + 60 + 'px'
        t.style.paddingBottom =  50 + res.statusBarHeight + 'px'
        }
      })
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
  .searchbar {
    position: sticky;
    top: 0;
    z-index: 888;
  }
  
  .home-content {
    padding: 10px 10px 48px;
    background-color: #eee;
    &::after {
      content: '';
      width: 100%;
      height: 75px;
      background: 'linear-gradient(to right, #6600ff, #EB4D50)';
      background-size: 100% 75px;
    }
    .swiper {
      border-radius: 15px;
      overflow: hidden;
    }
    .commodity {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-top: 10px;
      .commodity-item {
        background-color: #fff;
        border-radius: 15px;
        img {
          width: 100%;
          height: 100px;
          border-radius: 15px 15px 0 0;
        }
        .commodity-info {
          padding: 5px 10px;
        }
        .commodity-price {
          text-align: right;
        }
        .commodity-number {
          font-size: 12px;
          text-align: right;
          color: rgba($color: #000000, $alpha: 0.5)
        }
      }
    }
  }
}
</style>
