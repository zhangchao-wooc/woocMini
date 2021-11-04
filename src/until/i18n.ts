import Taro from '@tarojs/taro';

// 根据浏览器语言，请求线上语言包并过滤返回对于id的code
interface getLangType {
  moduleName: string;
  bizId: string;
  lang: string;
  version: string;
}


// 本地语言包
let data = Taro.getStorageSync('langData');
let langObj = data && JSON.parse(data);
let v = langObj && langObj._version;
const l = langObj && langObj._lang;

/**
 * 根据id取code
 * @param id             code
 * @param defaultValue   默认值
 * @returns
 */

var waitList = []
const t = (id: string) => {
  console.log('t', id, langObj, langObj[id]);
  if(langObj && langObj[id]) return langObj[id]
  const f = new Promise(reject, resolve)
  waitList.push(new Promise(reject,))

  setTimeout(() => {
    return langObj[id]
  }, 500);
};

const update = () => {

}

// 处理语言数据
const dealLang = (list: any, lang: string, v: string) => {
  console.log(list, lang, v);
  
  let obj: any = {};
  for (const i of list) {
    obj[i.code] = filterValue(i.displays, lang);
  }
  obj['_version'] = v;
  obj['_lang'] = lang;
  return JSON.stringify(obj);
};

// 获取code指定的值
const filterValue = (displays: any, lang: string) => {
  for (const i of displays) {
    if (i.localeId === lang) {
      return i.value;
    }
  }
};

var currentLanguage = ''
Taro.getSystemInfo({
  success: res => {
    currentLanguage = res.language
  }
})
// 公共接口获取语言包,ios的返回语言标记是小写的，统一转为小写
const getLang = (options = {
  moduleName: 'mini',
  bizId: 234,
  lang: currentLanguage,
  version: v,
}) => {
  
  console.log(options);
  
  return new Promise((resolve, reject) => {
    const lang = region[options.lang.toLowerCase()];
    console.log(lang, options.lang, options.lang.toLowerCase());
    if (lang !== l) {
      v = '';
    }
    wx.cloud.init()
    wx.cloud.callFunction({
      name: 'lang',
      data: {
        moduleName: 'mini',
        bizId: 234,
        lang: currentLanguage,
        version: v,
      }
    }).then(res => {
      const d = res.result.data[0].result
      
      // 本地不存在语言数据 || 语言数据版本不一致 更新本地语言数据
      if (v !== d.version || l !== lang || !langObj) {
        
        // 当前版本与线上版本一致时，items不存在
        if (d.items) {
          const list = dealLang(d.items, lang, d.version);
          console.log('list', list, lang);
          
          try {
            Taro.setStorageSync('langData', list)
            wx.startPullDownRefresh()
          } catch (e) { 
            console.error(e);
          }
          langObj = list;
          resolve(JSON.parse(list));
        }
      }
      reject('error');
    })
  });
};

// 浏览器语言表示 与 多语言部分语言表示 对应枚举
const region: any = {
  'ar-eg': 'ar',
  'az-az': 'az',
  'bg-bg': 'bg',
  'by-by': '',
  'ca-es': '',
  'cs-cz': 'cs',
  'da-dk': 'da',
  'de-de': 'de',
  'el-gr': 'el',
  'en-gb': 'en_GB',
  'en-us': 'en',
  'es-es': 'es',
  'et-ee': 'et',
  'fa-ir': 'fa',
  'fi-fi': 'fi',
  'fr-be': '',
  'fr-ca': '',
  'fr-fr': 'fr',
  'ga-ie': '',
  'gl-es': '',
  'he-il': 'he',
  'hi-in': 'hi',
  'hr-hr': 'hr',
  'hu-hu': 'hu',
  'hy-am': '',
  'id-id': 'id',
  'is-is': '',
  'it-it': 'it',
  'ja-jp': '',
  'kk-kz': 'kk',
  'kmr-iq': '',
  'kn-in': '',
  'ko-kr': 'ko',
  'ku-iq': '',
  'lt-lt': 'lt',
  'lv-lv': 'lv',
  'mk-mk': 'mk',
  'mn-mn': 'mn',
  'ms-my': 'ms',
  'nb-no': 'no',
  'ne-np': 'ne',
  'nl-be': '',
  'nl-nl': 'nl',
  'pl-pl': 'pl',
  'pt-br': 'pt_BR',
  'pt-pt': 'pt',
  'ro-ro': 'ro',
  'ru-ru': 'ru',
  'sk-sk': 'sk',
  'sl-si': 'sl',
  'sr-rs': 'sr',
  'sv-se': 'sv',
  'ta-in': 'ta',
  'th-th': 'th',
  'tr-tr': 'tr',
  'uk-ua': 'uk',
  'vi-vn': 'vi',
  'zh-cn': 'zh-Hans',
  'zh-hk': '',
  'zh-tw': 'zh-tw',
  'ja-ap': 'ja',
  ja: 'ja',
  ru: 'ru',
  ko: 'ko',
  ar: 'ar',
  'zh_cn': 'zh-Hans',
  'en': 'en',
};

export { getLang, t };
