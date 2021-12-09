<template>
  <view class="my">
    <view class="my-info" @click="catMyInfo">
      <image class="avatar" :src="userInfo.userInfo.avatarUrl" />
      <view class="nickname">{{userInfo.userInfo.nickName}}</view>
      <nut-icon class="icon" name="right"></nut-icon>
    </view>
    <view class="my-button">
      <nut-toast :msg="msg" v-model:visible="show" :type="type" />
      <nut-cell title="增量更新" @click="update" ></nut-cell>
      <nut-cell :title="t('language')" :desc="language" @click="switchActionSheet"></nut-cell>
    </view>
    
    <nut-actionsheet 
      v-model:visible="isVisible" 
      @close="switchActionSheet"
      :menu-items="menuItems"
      @choose="chooseItem"
      :cancel-txt='t("cancel")'
    ></nut-actionsheet>
    <tabbar :selected="2"></tabbar>
    <login :show="showLoginPage" :callback="loginCallback" />
  </view>
</template>

<script lang="ts">
import { onBeforeMount, onMounted, reactive, toRefs } from 'vue';
import { i18n, t } from '@wooc/mini-i18n'
import Taro from '@tarojs/taro'
import tabbar from '@/components/tabbar';
import login from '@/components/login'

export default {
  name: 'PersonalCenter',
  components: {
    tabbar,
    login
  },
  onShow() {
    Taro.setNavigationBarTitle({title: t('my')})
  },
  setup(){
    const state = reactive({
      msg: t('back_to_home'),
      msg2: '你成功了～',
      type: 'text',
      show: false,
      cover: false,
      language: '',
      isVisible: false,
      menuItems: [
        {
          name: t('chinese'),
          value: 'zh_CN'
        },
        {
          name: t('english'),
          value: 'en_US'
        },
      ],
      showLoginPage: false,
      userInfo: {
        userInfo: {
          avatarUrl: '',
          nickName: '未登录'
        }
      },
      isLogin: false
    });

    const switchActionSheet = () => {
      state.isVisible = !state.isVisible
    }

    const chooseItem = (item) => {
      state.language = item.name
      console.log(state.language, item.name, t(item.name));
      
      i18n.setLocales(item.value)
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

    })

    onMounted(() => {
      const l = Taro.getStorageSync('userInfo')
      console.log(l);
      
      if (l) {
        state.userInfo = l
        state.isLogin = true
      }
    });

    function catMyInfo () {
      if(!state.isLogin) {
        state.showLoginPage = true
      }
      
    }

    function loginCallback (res: any) {
      console.log(res);
      
      if(res) {
        state.userInfo = res
        state.isLogin = true
        Taro.getWeRunData({
      success: (res) => {
        console.log(res);
      }
    })
      }
      console.log('callback', state.userInfo);
      
      state.showLoginPage = false
    }

    return {
      ...toRefs(state),
      handleClick,
      onMounted,
      onBeforeMount,
      prompt,
      switchActionSheet,
      chooseItem,
      catMyInfo,
      loginCallback
    }
  },
  created() {
    // console.log('123', wx.t);
    // console.log(t('back_to_home'));
  },
  methods: {
    set() {
      const a = i18n.getLocales()
      i18n.setLocales( a === 'en-US' ? 'zh-CN':  'en-US')
      
    },
    // t(id) {
    //   return wx.$t(id)
    // },
    to() {
      console.log('to');
      
      Taro.reLaunch({
        url: '/pages/shop/index?params=10'
      })
    },
    update() {
      Taro.cloud.init()
      Taro.cloud.callFunction({
        name: 'lang',
        data: {
          moduleName: 'mini',
          bizId: 234,
          lang: '123',
          version: '123',
        }
      }).then(res => {
        const d = res.result.data[0].locales

        i18n.updateLocale(d)

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
    .nut-cell {
      line-height: 30px;
      font-size: 16px;
    }
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
