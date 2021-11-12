 /*
  * current env
  */
 declare global {
  interface Window {
    wx: any;
    my: any; 
  }
}

 function getEnv () {
  if (typeof window.wx !== 'undefined') {
    return 'wechat'
  } else if (typeof window.my !== 'undefined') {
    return 'alipay'
  } else if (typeof window !== 'undefined') {
    return 'browser'
  }
}

export const _env = getEnv()
