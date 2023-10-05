import { By, WebElement } from 'selenium-webdriver'
import SeleniumWebDriver from '@app/helper/seleniumWebDriver'

export class InstagramScrapper extends SeleniumWebDriver {
  private instagramLogin: boolean = false

  constructor(private readonly igCookie: string) {
    super()
  }

  public async loginInstagram() {
    if (this.instagramLogin) return this
    this.buildWebDriver()
    const manager = this.webDriver.manage()
    await this.webDriver.get('https://www.instagram.com')
    await manager.addCookie({ name: 'sessionid', value: this.igCookie })
    await this.webDriver.navigate().refresh()
  }

  public async fetchCurrentProfileInfo() {
    const sideBarContainer = await this.findElementOnRenderedPage(By.xpath('/html/body/div[2]/div/div/div[2]/div/div/div/div[1]/div[1]/div[1]'))
    const profileButton = (await sideBarContainer.findElement(By.xpath('div/div/div/div/div[2]/div[8]/div/span/div/a'))) as WebElement
    const currentUsername = await profileButton.getAttribute('href')
    return this.fetchProfileInfo(currentUsername)
  }

  public async fetchProfileInfo(profileUrl: string) {
    await this.webDriver.get(profileUrl)
    const profileHeaderSection = await this.findElementOnRenderedPage(By.xpath('/html/body/div[2]/div/div/div[2]/div/div/div/div[1]/div[1]/div[2]/div[2]/section/main/div/header'))
    const userPPElement = await profileHeaderSection.findElement(By.css('img'))
    const userPPLink = await userPPElement.getAttribute('src')

    const username = await this.getTextInsideElement(profileHeaderSection, By.css('h2'))

    const userEngagementElement = await profileHeaderSection.findElement(By.css('ul'))
    const handleEngagementInfo = async (xpath: string) => {
      const engagementValue = await this.getTextInsideElement(userEngagementElement, By.xpath(xpath))
      return engagementValue.split(' ')[0]
    }
    const totalPosts = await handleEngagementInfo('li[1]')
    const totalFollowers = await handleEngagementInfo('li[2]')
    const totalFollowings = await handleEngagementInfo('li[3]')

    return {
      userPPLink,
      username,
      totalPosts,
      totalFollowers,
      totalFollowings
    }
  }
}

export default async function CreateInstagramScrapper(cookie: string) {
  const instagramScrapper = new InstagramScrapper(cookie)
  await instagramScrapper.loginInstagram()
  return instagramScrapper
}
