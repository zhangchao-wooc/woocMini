/*
 * get current language
 */
const { env } = require('./env')
const _env = env()

export const getLang = () => {
  switch (_env) {
    case 'wechat':
      return _wxLang()
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