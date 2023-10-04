import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import appConfig from './app/config'
const appPort = appConfig.app.port

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(appPort, async () => {
    console.log(`🚀 Server ready at port: ${appPort}`)
  })
}
bootstrap()
