<template>
  <div class="w-tabbar">
    <nut-tabbar @tab-switch="tabSwitch" :bottom="true" v-model:visible="active">
      <nut-tabbar-item  
        v-for='item in tabbar'
        :key="item.path"
        :tab-title="item.text" 
        :icon="item.icon">
      </nut-tabbar-item>
    </nut-tabbar>
  </div>
</template>

<script lang="ts">
import { onBeforeMount, reactive, toRefs } from 'vue';
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
          text: wx.$t('home'),
          icon: 'home',
          path: '/pages/home/index'
        },
        {
          text: wx.$t('classification'),
          icon: 'category',
          path: '/pages/classification/index'
        },
        {
          text: wx.$t('discover'),
          icon: 'find',
          path: '/pages/discover/index'
        },
        {
          text: wx.$t('shoppingCart'),
          icon: 'cart',
          path: '/pages/shopping_cart/index'
        },
        {
          text: wx.$t('my'),
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
    
    onBeforeMount(() => [
      eventCenter.on(getCurrentInstance().router.onShow, () => {
        state.active = props.selected
      })
    ])

    return {onBeforeMount, tabSwitch, ...toRefs(state)}
  }
}
</script>

<style lang="scss" scoped>

</style>