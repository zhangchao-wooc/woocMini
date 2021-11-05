/*
 * reload Pages refresh Data
 */
const { _env } = require('./env')
const { getCurrentPages } = require('@tarojs/taro')

export const _reload = () => {
  switch(_env) {
    case 'wechat':
      _wxReload()
      break;
    case 'browser':
      window.location.reload()
  }

}

const _wxReload = () => {
  let pages = getCurrentPages() //获取页面数组
  let curPage = pages[pages.length - 1]  //获取当前页
  wx.reLaunch({
    url: `/${curPage.route}`
  })
}