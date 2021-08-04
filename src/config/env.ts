import { EnvConfig } from '../lib/commons/types'

const config: EnvConfig = {
  APP_PORT: process.env.APP_PORT || '3002',
  APP_PASS_ALL: process.env.APP_PASS_ALL || 'allowme',
  APP_FILE_DB: process.env.APP_FILE_DB || 'db/havyt.stormdb',

  JWT_SECRET: process.env.JWT_SECRET || 'sup3rs3cr3e8',
  // @ts-ignore
  JWT_EXP: (process.env.JWT_EXP || 60) * 60 * 1000,
  JWT_AUD: process.env.JWT_AUD || 'havyt'
}

export default config
