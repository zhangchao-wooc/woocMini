<template>
  <div class="w-tabbar">
    <nut-tabbar @tab-switch="tabSwitch" :bottom="true" v-model:visible="active">
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
import { eventCenter, getCurrentInstance } from '@tarojs/taro'

export default {
  name: 'tabbar',
  props: {
    selected: {
      type: Number,
      default: 0
    }
  },
  onShow () {
    console.log(123)
  },
  setup (props) {
    const state = reactive({
      active: props.selected,
      tabbar: [
        {
          text: 'home',
          icon: 'home',
          path: '/pages/home/index'
        },
        {
          text: 'classification',
          icon: 'category',
          path: '/pages/classification/index'
        },
        {
          text:'discover',
          icon: 'find',
          path: '/pages/discover/index'
        },
        {
          text:'shoppingCart',
          icon: 'cart',
          path: '/pages/shopping_cart/index'
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

    const t = (id:string) => {
      return wx.$t(id)
    }

    onMounted(() => {
      // wx.getSystemInfoAsync({
      //   success: res => {
      //     console.log(res);
      //   const {bottom, height} = res.safeArea
      //   const t1 = document.getElementsByClassName('nut-tabbar')[0]
      //   console.log(t1.style);
        
      //   t1.style.height = 'none'
      //   t1.style.padding = `${height}`
      //   }
      // })
    });
    
    onBeforeMount(() => [
      eventCenter.on(getCurrentInstance().router.onShow, () => {
        state.active = props.selected
      })
    ])

    return {t, onMounted, onBeforeMount, tabSwitch, ...toRefs(state)}
  }
}
</script>

<style lang="scss" scoped>

</style>