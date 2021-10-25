import { createApp } from 'vue'
import { InfiniteLoading, Avatar, Price, Cell, Button, Icon } from '@nutui/nutui-taro';
import '@nutui/nutui-taro/dist/styles/themes/default.scss';
import './app.scss'

const App = createApp({
  onShow (options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(Button).use(Icon).use(Cell).use(InfiniteLoading).use(Price).use(Avatar)

export default App
