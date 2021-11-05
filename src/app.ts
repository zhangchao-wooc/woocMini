import { createApp } from 'vue'
import locales from './locales'
import { i18n, t } from './until/mini-i18n'
import { InfiniteLoading, Avatar, Price, Cell, Button, Icon, Toast } from '@nutui/nutui-taro';
import '@nutui/nutui-taro/dist/styles/themes/default.scss';
import './app.scss'

i18n.init({
  locales
})
wx.$i18n = i18n
wx.$t = t

const App = createApp({
  data() {
    return {
      lang: ''
    }
  },
  onLaunch (options) {
    console.log('app', wx.$i18n.getEnv());
    
  },
  onShow (options) {
    
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
  
})

App.use(Button).use(Icon).use(Cell).use(InfiniteLoading).use(Price).use(Avatar).use(Toast)

export default App
