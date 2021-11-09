/*
 * 监听重新打开小程序之后的系统语言是否变化
 */
const {_env} = require('../until');
const { _hint } = require('./hint')

export const _listener = (i18n) => {
  console.log('_hint', _hint);
  
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
  }
}

function _wxListener (i18n) {
  wx.onAppShow(res => {
    _hint(i18n)
  })
}

function _alipayListener (i18n) {
  my.onAppShow(res => {
    _hint(i18n)
  })
}