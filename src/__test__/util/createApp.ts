import { json } from 'express'

import { Test } from '@nestjs/testing'
import { NestExpressApplication } from '@nestjs/platform-express'

import { AppModule } from '@root/app.module'

export default class CreateApp {
  private app: NestExpressApplication

  constructor() {}

  public async loadApp() {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    this.app = moduleFixture.createNestApplication()
    this.app.use(json({ type: '*/*' }))

    return this.app
  }

  public async stopApp() {
    await this.app.close()
    jest.clearAllMocks()
    jest.restoreAllMocks()
  }
}
