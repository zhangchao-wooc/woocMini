<template>
  <view class="my">
    <view class="my-info">
      <image class="avatar" src="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png" />
      <view class="nickname">{{t('back_to_home')}}</view>
      <nut-icon class="icon" name="right"></nut-icon>
    </view>
    <view class="my-button">
      <nut-toast :msg="msg" v-model:visible="show" :type="type" />
      <nut-cell title="增量更新" @click="update" ></nut-cell>
      <nut-cell title="prompt" @click="prompt" ></nut-cell>
      <nut-cell :title="t('language')" :desc="language" @click="switchActionSheet"></nut-cell>
    </view>
    
    <nut-actionsheet 
      v-model:visible="isVisible" 
      @close="switchActionSheet"
      :menu-items="menuItems"
      @choose="chooseItem"
      :cancel-txt='t("cancel")'
    ></nut-actionsheet>
    <tabbar :selected="4"></tabbar>
  </view>
</template>

<script lang="ts">
import tabbar from '@/components/tabbar';
import { onBeforeMount, onMounted, reactive, toRefs } from 'vue';
import Taro from '@tarojs/taro'

export default {
  name: 'PersonalCenter',
  components: {
    tabbar
  },
  setup(){
    const state = reactive({
      msg: wx.$t('back_to_home'),
      msg2: '你成功了～',
      type: 'text',
      show: false,
      cover: false,
      language: '',
      isVisible: false,
      menuItems: [
        {
          name: wx.$t('chinese'),
          value: 'zh_CN'
        },
        {
          name: wx.$t('english'),
          value: 'en_US'
        },
      ]
    });

    const t = (id:string) => {
      return wx.$t(id)
    }

    const switchActionSheet = () => {
      state.isVisible = !state.isVisible
    }

    const chooseItem = (item) => {
      state.language = item.name
      console.log(state.language, item.name, t(item.name));
      
      wx.$i18n.setLocales(item.value)
    }

    const handleClick = (type: string, msg: string, cover: boolean = false) => {
      state.show = true;
      state.msg2 = msg;
      state.type = type;
      state.cover = cover;
    };

    const prompt = () => {
      state.show = true
    }

    onBeforeMount(() => {
      wx.getSystemInfoAsync({
        success: res => {
          console.log(res);
        }
      })
      const info = wx.getDeviceInfo()
      console.log(info);
      // state.language = wx.$i18n.getLocales()
    })

    onMounted(() => {
      wx.setNavigationBarTitle({title: wx.$t('my')})
    });

    return {
      ...toRefs(state),
      handleClick,
      onMounted,
      onBeforeMount,
      prompt,
      t,
      switchActionSheet,
      chooseItem
    }
  },
  created() {
    // console.log('123', wx.t);
    console.log(wx.$t('back_to_home'));
  },
  methods: {
    set() {
      const a = wx.$i18n.getLocales()
      wx.$i18n.setLocales( a === 'en-US' ? 'zh-CN':  'en-US')
      
    },
    t(id) {
      return wx.$t(id)
    },
    to() {
      console.log('to');
      
      Taro.reLaunch({
        url: '/pages/shop/index?params=10'
      })
    },
    update() {
      wx.cloud.init()
      wx.cloud.callFunction({
        name: 'lang',
        data: {
          moduleName: 'mini',
          bizId: 234,
          lang: '123',
          version: '123',
        }
      }).then(res => {
        const d = res.result.data[0].locales

        wx.$i18n.updateLocale(d)

      })
    }
  }
}
</script>

<style lang="scss">
.my {
  padding-bottom: 0 15px 48px;
  height: 100vh;
  background-color: #eee;
  .my-button {
    padding: 0 10px;
  }
  .my-info {
    position: relative;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    background-color: #fff;

    .avatar {
      width: 65px;
      height: 65px;
    }
    .nickname {
      margin-left: 20px;
      font-size: 25px;
      font-weight: bold;
    }
    .icon {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translate(0, -50%);
    }
  }
}
</style>
