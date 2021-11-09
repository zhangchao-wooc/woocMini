 /*
  * current env
  */
 function getEnv () {
   
  if (typeof wx !== 'undefined') {
    return 'wechat'
  } else if (typeof my !== 'undefined') {
    console.log('alipay');
    return 'alipay'
  } else if (typeof window !== 'undefined') {
    return 'browser'
  }
}

export const _env = getEnv()