import { config } from 'dotenv'
import { join } from 'path'

const pjson = require(join(process.cwd(), 'package.json'))

config()
const validNodeEnv = ['development', 'test', 'staging', 'production']

const appConfig = {
  app: {
    name: pjson.name,
    version: pjson.version,
    env: (validNodeEnv.includes((process.env as any).NODE_ENV) ? process.env.NODE_ENV : 'development') as string,
    port: parseInt((process.env as any).PORT) || 3000
  }
}

export default appConfig
