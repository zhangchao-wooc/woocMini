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
              <view class="commodity-info_name">{{t(item.name)}}</view>
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
    <WTabbar :selected="0"></WTabbar>
  </view>
</template>

<script lang="ts">
import WTabbar from '@/components/tabbar';
import WAudioVideo from '@/components/audio_video';
import { i18n, t } from '@wooc/mini-i18n'

import { onMounted, reactive, ref, toRefs } from 'vue';
export default {
  name: 'Home',
  components: {
    WTabbar,
    WAudioVideo
  },
  beforeMount () {
    
    
  },
  onShow() {
    
    console.log(i18n._formatLanguageTag('123'));
    // wx.setNavigationBarTitle({title: t('home')})
      
  },
  setup(props){
    const state = reactive({
      safeArea: {},
      searchValue: '',
      videoUrl: 'https://airtake-private-data-1254153901.cos.ap-shanghai.myqcloud.com/smart/pontos/1636626544f5966261418.mov?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDopcCYgw0qRoyV5qfKjvg2pPkqESnb5zI%26q-sign-time%3D1636898199%3B1636901799%26q-key-time%3D1636898199%3B1636901799%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D042c4ffd339df0c90e2e317a947020f9e756b277',
      audioUrl: 'https://upos-hz-mirrorakam.akamaized.net/upgcxcode/97/50/251345097/251345097-1-30280.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1636827070&gen=playurlv2&os=akam&oi=312668868&trid=de99dffc742347cdafa566afa885d488u&platform=pc&upsig=94c5f8e2ccbc3194bcb776106540fbab&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&hdnts=exp=1636827070~hmac=a19f35a6dffa3d0d4ecb1552dcf7cc59ca28a3e89d6d149d7a21bea54c973103&mid=482041345&bvc=vod&nettype=0&orderid=1,2&agrr=1&bw=16338&logo=40000000',
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
    // const t = (id) => {
    //   return wx.$t(id)
    // }
    onMounted(() => {
      console.log(props);
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
       onMounted, refresh, loadMore, hasMore, ...toRefs(state)
    }
  },
  created() {
    // console.log(t('home'));
  }
}
</script>

<style lang="scss">
.home {
  height: 100vh;
  background-color: #eee;
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
