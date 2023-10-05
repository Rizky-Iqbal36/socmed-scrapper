import { Injectable } from '@nestjs/common'
import CreateInstagramScrapper from '@app/providers/instagramScrapper'

@Injectable()
export class InstagramService {
  public async igProfileInfo(igCookie: string) {
    const instagramScrapper = await CreateInstagramScrapper(igCookie)
    const currentProfileInfo = await instagramScrapper.fetchCurrentProfileInfo()

    // if (await instagramScrapper.webDriver) await instagramScrapper.closeWebDriver()
    return currentProfileInfo
  }
}
