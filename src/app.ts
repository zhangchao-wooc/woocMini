import { createApp } from 'vue'
import i18 from './plugins/t'
import locales from './locales'
import { i18n, t } from '@wooc/mini-i18n'
import { Tabs, TabPane, ActionSheet, Popup, SearchBar, InfiniteLoading, Avatar, Price, Cell, Button, Icon, Toast, Tabbar, TabbarItem } from '@nutui/nutui-taro';
import '@nutui/nutui-taro/dist/styles/themes/default.scss';
import './app.scss'

i18n.init({
  locales,
  isHint: true,
  themeColor: '#6600ff',
  homePath: '/pages/home/index'
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
    console.log(App);
    
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
  // 
})

App.use(i18, t).use(Button).use(Icon).use(Cell).use(InfiniteLoading)
.use(Price).use(Avatar).use(Toast).use(Tabbar).use(TabbarItem)
.use(SearchBar).use(ActionSheet).use(Popup).use(Tabs).use(TabPane)

export default App
