import { AbstractHttpAdapter } from '@nestjs/core'
import {
  ExpressAdapter
} from '@nestjs/platform-express'

/** Инициализатор Express */
export class ExpressInitializer {
  public static factory(): AbstractHttpAdapter {
    return new ExpressAdapter()
  }
}
