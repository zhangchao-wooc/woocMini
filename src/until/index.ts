import Taro from '@tarojs/taro'

export const isLogin = () => {
  const l = Taro.getStorageSync('userInfo')
  if(l) return true
  return false
}