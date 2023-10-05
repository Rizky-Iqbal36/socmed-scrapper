import Joi, { ObjectSchema } from 'joi'
import { Controller, Get, Query } from '@nestjs/common'
import { InstagramService } from '@service/socmed/instagram.service'
import { BaseController } from '../base.controller'
import { EFlag } from '@root/interfaces/enum'

@Controller('socmed')
export class SocmedController extends BaseController {
  constructor(private readonly instagramService: InstagramService) {
    super()
  }

  @Get('instagram/profile')
  public async instagramProfile(@Query() query: any) {
    const validationSchema: ObjectSchema = Joi.object({
      cookie: Joi.string().required()
    }).unknown()
    await this.validateReq(validationSchema, query, EFlag.INVALID_PARAM)
    return this.instagramService.igProfileInfo(query.cookie)
  }
}
