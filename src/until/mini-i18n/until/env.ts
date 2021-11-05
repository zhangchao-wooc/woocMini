 function getEnv () {
   console.log(window.navigator.languages, process);
   
  if(wx) {
    return 'wechat'
  }
}

export const _env = getEnv()