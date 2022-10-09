import request from 'supertest'
import appConfig from '@app/config'

import CreateApp from '@root/__test__/util/createApp'

const url = '/health-check'
const createApp = new CreateApp()
describe('API Health check', () => {
  let app: CreateApp['app']

  beforeAll(async () => {
    app = await createApp.loadApp()

    await app.init()
  })

  afterAll(async () => {
    await createApp.stopApp()
  })

  it('Success => Should hit health check endpoint', async () => {
    const res = await request(app.getHttpServer()).get(url).send()
    expect(res.status).toBe(200)
    expect(res.body).toMatchObject({
      name: appConfig.app.name,
      version: appConfig.app.version,
      environment: appConfig.app.env
    })
    expect(res.body).toHaveProperty('uptime')
  })
})
