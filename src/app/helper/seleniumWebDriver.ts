import { ThenableWebDriver, Builder, By, until } from 'selenium-webdriver'
import appConfig from '@app/config'

export default class SeleniumWebDriver {
  private builder: Builder
  public webDriver: ThenableWebDriver = undefined as any

  constructor() {
    const { webdriver } = appConfig
    this.builder = new Builder()
      .forBrowser('chrome')
      .usingServer(webdriver.serverUrl)
  }

  private isWebDriverBuilded() {
    if (!this.webDriver) throw new Error('Webdriver not builded yet')
  }

  public buildWebDriver() {
    this.webDriver = this.builder.build()
  }

  public async closeWebDriver() {
    this.isWebDriverBuilded()
    await this.webDriver.quit()
  }

  public async findElementOnRenderedPage(by: By, waitPageToBerendered = 10) {
    this.isWebDriverBuilded()
    return this.webDriver
      .wait(until.elementLocated(by), waitPageToBerendered * 1000)
      .then(async () => this.webDriver.findElement(by))
      .catch(() => undefined)
  }
}
