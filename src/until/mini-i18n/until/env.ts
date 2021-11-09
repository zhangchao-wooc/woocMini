 function getEnv () {
   console.log(window.navigator.languages, process);
   
  if (wx) {
    return 'wechat'
  } else if (my) {
    return 'alipay'
  }
}

export const _env = getEnv()