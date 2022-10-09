import { Module } from '@nestjs/common'

import controllers from '@root/controllers'
import services from '@root/services'

@Module({
  imports: [],
  controllers,
  providers: [...services]
})
export class AppModule {}
