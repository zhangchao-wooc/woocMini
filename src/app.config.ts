export default {
  pages: [
    'pages/home/index',
    'pages/tool/metronome/index',
    'pages/tool/compass/index',
    'pages/tool/index',
    
    
    // 'pages/tool/index',
    'pages/my/index',
    // 'pages/tool/metronome/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    enablePullDownRefresh: true
  },
  tabBar: {
    color: '#fff',
    selectedColor: '#6600ff',
    backgroundColor: '#fff',
    borderStyle: 'black',
    custom: true,
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: './assets/home.png',
        selectedIconPath: './assets/home_selected.png'
      },
      {
        pagePath: 'pages/tool/index',
      },
      {
        pagePath: 'pages/my/index',
        text: '我的',
        iconPath: './assets/my.png',
        selectedIconPath: './assets/my_selected.png'
      }
    ],
  }
  
}
