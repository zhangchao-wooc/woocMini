export default {
  pages: [

    'pages/home/index',
    'pages/classification/index',
    'pages/discover/index',
    'pages/shopping_cart/index',
    'pages/my/index',

  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
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
        pagePath: 'pages/classification/index',
      },
      {
        pagePath: 'pages/discover/index',
      },
      {
        pagePath: 'pages/shopping_cart/index',
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
