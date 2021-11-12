/*
 * reload Pages refresh Data
 */
import { _env } from './env';
import { getCurrentPages } from '@tarojs/taro';

export const _reload = (i18n: any) => {
  switch(_env) {
    case 'wechat':
      _wxReload(i18n)
      break;
    case 'alipay':
      _alipayReload()
      break;
    case 'browser':
      window.location.reload()
  }

}

function _wxReload (i18n: any) {
  console.log('_wxReload', i18n.currentPath);
  window.wx.reLaunch({
    url: `/${i18n.currentPath}`
  })
}

function _alipayReload () {
  let pages = getCurrentPages() //获取页面数组
  let curPage = pages[pages.length - 1]  //获取当前页
  window.my.reLaunch({
    url: `/${curPage.route}`
  })
}
