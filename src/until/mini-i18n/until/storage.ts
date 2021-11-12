/*
 * get or set localStorage
 */
import { _env } from './env'

export const _storage = (handler: string, lang?: string) => {
  let l = ''
  switch (_env) {
    case 'wechat':
      l = _wxStorage(handler, lang)
      return l
    case 'alipay':
      l = _alipayStorage(handler, lang)
      return l
    case 'browser':
      return _browserStorage(handler, lang)
    default:
      throw `${_storage}: Does not support the current environment`
  }
}

function _wxStorage (h: string, lang?: string) {
  if(h === 'get') {
    try {
      const res = window.wx.getStorageSync('tuya_locale')
      if (res) {
        // Do something with return value
        return res
      }
    } catch (e) {
      // Do something when catch error
    }
  } else if(h === 'set') {
    window.wx.setStorage({
      key: 'tuya_locale',
      data: lang
    })
  } else {
    _errorLog('_wxStorage')
  }
}

function _alipayStorage (h: string, lang?: string) {
  if(h === 'get') {
    try {
      const res = window.my.getStorageSync({ key: 'tuya_locale' })
      if (!res.error) {
        // Do something with return value
        return res.data
      }
    } catch (e) {
      // Do something when catch error
    }
  } else if(h === 'set') {
    window.my.setStorage({
      key: 'tuya_locale',
      data: lang
    })
  } else {
    _errorLog('_alipayStorage')
  }
}

function _browserStorage (h: string, lang?: string) {
  if(h === 'get') {
    return localStorage.getItem('tuya_locale')
  } else if(h === 'set') {
    localStorage.setItem('tuya_locale', lang || '')
  }
}

function _errorLog (p: string) {
  throw `${p}: Please check params`
}
