<template>
  <view class="classification">
    <nut-tabs v-model="tab4value" title-scroll title-gutter="10" direction="vertical" style="height: 100vh">
      <nut-tabpane v-for="item in list" :title="'Tab '+ item.title" :key="item">
        Tab {{item.title}}
      </nut-tabpane>
    </nut-tabs>
    <tabbar :selected="1"></tabbar>
  </view>
</template>

<script>
import tabbar from '@/components/tabbar';
import { reactive, toRefs } from 'vue';
export default {
  components: {
    tabbar
  },
  setup () {
    const state = reactive({
      tab4value: '0',
      list: [
        {
          title: '手机',
          paneKey: 'c1',
          icon: 'dongdong'
        },
        {
          title: '电脑',
          paneKey: 'c2',
          icon: 'JD'
        },
        {
          title: '家具',
          paneKey: 'c3'
        }
      ]
    })
    return {...toRefs(state)}
  }
}
</script>

<style>

</style>