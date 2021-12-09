<template>
  <!-- 头部导航 -->
  <div class="w-navbar">
    <text v-if="!isSlot" class="title" >{{title}}</text>
    <slot v-else></slot>
  </div>
</template>

<script lang="ts">
import Taro from '@tarojs/taro'
import { onMounted, reactive, toRefs } from 'vue';

export default {
  name: 'Navbar',
  props: {
    title: {
      type: String,
      default: ''
    },
    isSlot: {
      type: Boolean,
      default: false
    },
    bgi: {
      type: String,
      default: "#fff" // 背景background-image
    },
    color: {
      type: String,
      default: '#000' // 字体颜色
    }
  },
  onShow() {

  },
  setup(props){
    const state = reactive({
      title: props.title,
      isSlot: props.isSlot
    });

    onMounted(() => {
      console.log(props);
      
      const info = Taro.getMenuButtonBoundingClientRect()
      const t = document.getElementsByClassName('title')[0]
      
      if(t) {
        t.style.color = props.color
        // @ts-ignore
        t.style.top = info.top + 'px'
        // @ts-ignore
        t.style.lineHeight = info.height + 'px'
      }
      const t1 = document.getElementsByClassName('w-navbar')[0]
      // @ts-ignore
      t1.style.backgroundImage = props.bgi
      Taro.getSystemInfo({
        success: res => {
        // @ts-ignore
        t1.style.paddingTop = res.safeArea.top + 60 + 'px'
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
.w-navbar {
  position: sticky;
  top: 0;
  z-index: 888;
  // animation: _pulse 20s linear infinite;
  .title {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    color: #fff;
    font-weight: bold;
  }
  }
</style>
