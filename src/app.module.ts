import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'

import controllers from '@root/controllers'
import services from '@root/services'
import ExceptionsFilter from './app/exception/filter'

@Module({
  imports: [],
  controllers,
  providers: [...services, { provide: APP_FILTER, useClass: ExceptionsFilter },]
})
export class AppModule {}
