/*
 * get or set localStorage
 */
const { env } = require('./env')

export const _storage = (handler: string, lang?: string) => {
  const _env = env()

  switch (_env) {
    case 'wechat':
      const l = _wxStorage(handler, lang)
      console.log(l);
      
      return l
    default:
      throw `${_storage}: Does not support the current environment`
  }
  
}

const _wxStorage = (h: string, lang?: string) => {
  if(h === 'get') {
    try {
      const res = wx.getStorageSync('tuya_locale')
      if (res) {
        // Do something with return value
        return res
      }
    } catch (e) {
      // Do something when catch error
    }
  } else if(h === 'set') {
    wx.setStorage({
      key: 'tuya_locale',
      data: lang
    })
  } else {
    _errorLog('_wxStorage')
  }
  
  
}

const _errorLog = (p: string) => {
  throw `${p}: Please check params`
}