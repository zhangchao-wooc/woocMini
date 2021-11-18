<template>
  <div class="w-tabbar">
    <nut-tabbar id="tabbar" @tab-switch="tabSwitch" :bottom="true" v-model:visible="active" :style="{height: height + 'px'}">
      <nut-tabbar-item  
        v-for='item in tabbar'
        :key="item.path"
        :tab-title="t(`${item.text}`)" 
        :icon="item.icon">
      </nut-tabbar-item>
    </nut-tabbar>
  </div>
</template>

<script lang="ts">
import { onMounted, onBeforeMount, reactive, toRefs } from 'vue';
import Taro, { eventCenter, getCurrentInstance } from '@tarojs/taro'

export default {
  name: 'tabbar',
  props: {
    selected: {
      type: Number,
      default: 0
    }
  },
  setup (props) {
    const state = reactive({
      height: 50,
      active: props.selected,
      tabbar: [
        {
          text: 'home',
          icon: 'home',
          path: '/pages/home/index'
        },
        {
          text: 'tool',
          icon: 'category',
          path: '/pages/tool/index'
        },
        {
          text: 'my',
          icon: 'my',
          path: '/pages/my/index'
        }
      ]
    })

    const tabSwitch = (item: object, index: number) => {
      try {
        wx.switchTab({
          url: state.tabbar[index].path
        })
      } catch (e) {
        console.error(e);
      }
    }

    // const t = (id:string) => {
    //   return wx.$t(id)
    // }

    onMounted(() => {
      const d = document.getElementsByClassName('nut-tabbar')[0]
      console.log(d);
      Taro.getSystemInfo({
        complete: res => {
          console.log(res);
          state.height = 50 + res.statusBarHeight / 2
        }
      })
    });
    
    onBeforeMount(() => [
      eventCenter.on(getCurrentInstance().router.onShow, () => {
        state.active = props.selected
      })
    ])

    return { onMounted, onBeforeMount, tabSwitch, ...toRefs(state)}
  },
  mounted () {
      // const d = document.getElementsByClassName('nut-tabbar')[0]

    
  }
}
</script>

<style lang="scss" scoped>

</style>