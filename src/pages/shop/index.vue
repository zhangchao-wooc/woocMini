<template>
  <view class="personal_center">
    <view class="personal-info">
      <view>
        {{t('page.localeProvider')}}
      </view>
    </view>
    <button @click="set">切换</button>   
    <button @click="to">返回</button> 
  </view>
</template>

<script lang="ts">
import { onBeforeMount, onMounted, reactive, toRefs } from 'vue';
import Taro from '@tarojs/taro'
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
    onBeforeMount(() => {
      wx.hideHomeButton()
    })

    onMounted(() => {
      wx.setNavigationBarTitle({title: wx.$t('shop')})
    });

    return {
      ...toRefs(state),
      handleClick,
      onMounted,
      onBeforeMount
    }
  },
  created() {
    // console.log('123', wx.t);
    console.log(wx.$t('back_to_home'));
  },
  methods: {
    set() {
      const a = wx.$i18n.getLocales()
      console.log('set', a);
      console.log(wx);
      
      wx.$i18n.setLocales( a === 'zh-CN' ? 'en-US' : 'zh-CN')
      // this.msg2 = wx.$i18n.getLocales()
    },
    t(id) {
      return wx.$t(id)
    },
    to() {
      console.log('to');
      Taro.switchTab({
        url: '/pages/personal_center/index'
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
