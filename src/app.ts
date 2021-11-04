import { createApp } from 'vue'
// import { getLang } from './until/i18n'
import Taro from '@tarojs/taro'
import './locales'
import { i18n, t } from './until/mini-i18n'
import { InfiniteLoading, Avatar, Price, Cell, Button, Icon } from '@nutui/nutui-taro';
import '@nutui/nutui-taro/dist/styles/themes/default.scss';
import './app.scss'

wx.$i18n = i18n
wx.$t = t

const App = createApp({
  data() {
    return {
      lang: ''
    }
  },
  onLaunch (options) {
    console.log('app', wx.$i18n);
    
  },
  onShow (options) {
    console.log('显示');
    Taro.eventCenter.on('set', function() {
      console.log('EventChannel', 'set');
      // Taro.startPullDownRefresh()
      // this.lang = wx.$i18n.getLocales()
      console.log(this.lang);
      
    })
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
  
})

App.use(Button).use(Icon).use(Cell).use(InfiniteLoading).use(Price).use(Avatar)

export default App
