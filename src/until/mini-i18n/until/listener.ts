/*
 * 监听重新打开小程序之后的系统语言是否变化
 */
import { _env } from '../until';
import { _hint } from './hint';

export const _listener = (i18n: any) => {
  
  switch(_env) {
    case 'wechat':
      _wxListener(i18n)
      break;
    case 'alipay':
      _alipayListener(i18n)
      break;
    case 'browser':
      window.location.reload()
      break;
    default: 
      console.error('未判断出当前环境');
  }
}

function _wxListener (i18n: any) {
  window.wx.onAppRouteDone((res: { path: string; }) => {
    i18n.currentPath = res.path
  })
  window.wx.onAppShow((res: any) => {
    console.log('i18n onshow', res, wx);
    _hint(i18n)
  })
}

function _alipayListener (i18n: any) {
  window.my.onAppShow((res: any) => {
    _hint(i18n)
  })
}
