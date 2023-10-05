import { AppService } from '@service/app.service'

import { InstagramService } from './socmed/instagram.service'
const SocmedServices = [InstagramService]

export default [AppService, ...SocmedServices]
