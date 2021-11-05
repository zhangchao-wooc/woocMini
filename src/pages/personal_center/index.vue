<template>
  <view class="personal_center">
    <view class="personal-info">
      <nut-avatar bg-color="#fff" size="large" icon="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"></nut-avatar>
      <view class="nickname">{{t('back_to_home')}}</view>
      <nut-icon class="icon" name="right"></nut-icon>
    </view>
    <div class="show" style="display: grid; placeItems: center; margin: 50px 0">
      <view class="nickname">{{t('back_to_home')}}</view>
      <view class="nickname">{{t('refresh')}}</view>
      <view class="nickname">{{t('home')}}</view>
    </div>
    <button @click="set">切换语言</button>
    <button @click="to">跳转非tabBar</button>
    <button @click="update">增量更新</button>
    <button @click="prompt">prompt</button>
    <nut-toast :msg="msg" v-model:visible="show" :type="type" />

  </view>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs } from 'vue';
import Taro from '@tarojs/taro'
// import { Toast } from '@nutui/nutui-taro';
// import button from '../../components/button';
export default {
  name: 'PersonalCenter',
  components: {
  //  'demo-button': button
  },
  setup(){
    const state = reactive({
      msg: wx.$t('back_to_home'),
      msg2: '你成功了～',
      type: 'text',
      show: false,
      cover: false
    });

    const handleClick = (type: string, msg: string, cover: boolean = false) => {
      state.show = true;
      state.msg2 = msg;
      state.type = type;
      state.cover = cover;
    };

    const prompt = () => {
      state.show = true
    }

    onMounted(() => {
      wx.setNavigationBarTitle({title: wx.$t('my')})
    });

    return {
      ...toRefs(state),
      handleClick,
      onMounted,
      prompt
    }
  },
  created() {
    // console.log('123', wx.t);
    console.log(wx.$t('back_to_home'));
  },
  methods: {
    set() {
      console.log(wx.$i18n);

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
.personal_center {
  .personal-info {
    position: relative;
    display: flex;
    align-items: center;
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
