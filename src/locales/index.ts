import zh from './zh.json'
import en from './en.json'
import { i18n } from '../until/mini-i18n'

i18n.init({
  locales: {
    'zh-Hans': zh,
    en
  }
})
