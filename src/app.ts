import { createApp } from "vue";
import i18 from "./plugins/t";
import locales from "./locales";
import { i18n, t } from "@wooc/mini-i18n";
import {
  Swiper,
  SwiperItem,
  Barrage,
  Navbar,
  Tag,
  Range,
  Tabs,
  TabPane,
  ActionSheet,
  Popup,
  SearchBar,
  InfiniteLoading,
  Avatar,
  Price,
  Cell,
  Button,
  Icon,
  Toast,
  Tabbar,
  TabbarItem
} from "@nutui/nutui-taro";
import "@nutui/nutui-taro/dist/styles/themes/default.scss";
import "./app.scss";
import Taro from '@tarojs/taro';
import Behavior from './until/behavior.js'
import zh from './locales/zh-up';
import en from './locales/en.json';


const App = createApp({
  behaviors: [Behavior],
  data() {
    return {
      lang: "123"
    };
  },
  onLaunch(options) {
    console.log(i18n.getLocales());
    i18n.init({
      locales,
      isHint: true,
      // lang: 'zh_CN',
      isVerifiyApi: true,
      themeColor: "#ff6600",
      homePath: "/pages/home/index"
    });
    
    setTimeout(function(){
      i18n.updateLocale({locales: {'zh-Hans': zh, en}})
      // Taro.redirectTo({
      //   url: '/pages/tool/metronome/index'
      // })
      Taro.startPullDownRefresh()
    }, 3000)
    
    
  },
  onShow(options) {
    console.log(this.lang, this.ty_lang);
    
  } 
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

App.use(i18, t)
  .use(Button)
  .use(Icon)
  .use(Cell)
  .use(InfiniteLoading)
  .use(Price)
  .use(Avatar)
  .use(Toast)
  .use(Tabbar)
  .use(TabbarItem)
  .use(SearchBar)
  .use(ActionSheet)
  .use(Popup)
  .use(Tabs)
  .use(TabPane)
  .use(Range)
  .use(Tag)
  .use(Navbar)
  .use(Barrage)
  .use(Swiper)
  .use(SwiperItem);

export default App;
