import { EnvConfig } from '../lib/commons/types'

const config: EnvConfig = {
    APP_PORT: process.env.APP_PORT || '3002',
    APP_PASS_ALL: process.env.APP_PASS_ALL || 'allowme',
    APP_FILE_DB: process.env.APP_FILE_DB || 'db/havyt.stormdb'
}

export default config
