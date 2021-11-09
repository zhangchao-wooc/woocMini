/*
 * get current language
 */
const { _env } = require('./env')

export const getLang = () => {
  switch (_env) {
    case 'wechat':
      return _wxLang()
    case 'alipay':
      return _alipayLang()
    case 'browser':
      return window.navigator.language || ''
    default:
      break;
  }
}

const _wxLang = () => {
  let l
  wx.getSystemInfo({
    success: (res) => {
      l = res.language
    },
    fail: (err) => {
      console.error(err)
    }
  })
  return l
}

const _alipayLang = () => {
  return my.env.language || ''
}