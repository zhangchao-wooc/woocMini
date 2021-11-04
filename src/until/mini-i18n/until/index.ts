const { env } = require('./env')
const { region } = require('./ua')
const { _reload } = require('./reload')
const { _storage } = require('./storage')
const { getLang } = require('./getLang')


export {
  env,
  region,
  _reload,
  _storage,
  getLang
}