const {_env, getLang} = require('../until');

export const _hint = (i18n) => {
  switch(_env) {
    case 'wechat':
      _wxHint(i18n)
      break;
    case 'alipay':
      _alipayHint(i18n)
      break;
    case 'browser':
      window.location.reload()
      break;
  }
}

function _wxHint (i18n) {
  const isChinese = i18n.langTag === 'zh-Hans'
  const langList = i18n.getLanguagePackList()
  const sysLang = getLang()
  const tag = i18n._formatLanguageTag(sysLang)
  const index = langList.findIndex(item => item === tag)
  console.log('getLang()', sysLang, tag, i18n.lang, index);
  if(sysLang !== i18n.lang) {
    if(index !== -1) {
      wx.showModal({
        title: isChinese ? '提示' : 'Hint',
        cancelText: isChinese ? '取消' : 'Cancel',
        confirmText: isChinese ? '切换' : 'Switch',
        confirmColor: i18n.themeColor,
        content: isChinese ? `当前系统语言为${sysLang}，是否切换？` : `
        The current system language is ${sysLang}, do you want to switch?`,
        success (res) {
          if (res.confirm) {
            i18n.setLocales(sysLang)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else if(i18n.lang !== i18n._formatLanguageTag(i18n.defualtLang)) {
      wx.showModal({
        title: isChinese ? '提示' : 'Hint',
        cancelText: isChinese ? '取消' : 'Cancel',
        confirmText: isChinese ? '切换' : 'Switch',
        confirmColor: i18n.themeColor,
        content: isChinese ? `不支持当前系统语言${sysLang}，是否切换为英文？` : `
        The current system language ${sysLang} is not supported, should you switch to English?`,
        success (res) {
          if (res.confirm) {
            i18n.setLocales(i18n.defualtLang)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
}

function _alipayHint (i18n) {
  const isChinese = i18n.langTag === 'zh-Hans'
  const langList = i18n.getLanguagePackList()
  const sysLang = getLang()
  const tag = i18n._formatLanguageTag(sysLang)
  const index = langList.findIndex(item => item === tag)
  console.log('getLang()', sysLang, tag, i18n.lang, index);
  if(sysLang !== i18n.lang) {
    if(index !== -1) {
      my.confirm({
        title: isChinese ? '提示' : 'Hint',
        cancelButtonText: isChinese ? '取消' : 'Cancel',
        confirmButtonText: isChinese ? '切换' : 'Switch',
        // confirmColor: i18n.themeColor,
        content: isChinese ? `当前系统语言为${sysLang}，是否切换？` : `
        The current system language is ${sysLang}, do you want to switch?`,
        success (res) {
          if (res.confirm) {
            i18n.setLocales(sysLang)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else if(i18n.lang !== i18n._formatLanguageTag(i18n.defualtLang)) {
      my.confirm({
        title: isChinese ? '提示' : 'Hint',
        cancelButtonText: isChinese ? '取消' : 'Cancel',
        confirmButtonText: isChinese ? '切换' : 'Switch',
        // confirmColor: i18n.themeColor,
        content: isChinese ? `不支持当前系统语言${sysLang}，是否切换为英文？` : `
        The current system language ${sysLang} is not supported, should you switch to English?`,
        success (res) {
          if (res.confirm) {
            i18n.setLocales(i18n.defualtLang)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
}