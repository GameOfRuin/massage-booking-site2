import { ApiHideProperty } from '@nestjs/swagger'
import { CrudResponseSuccessMany } from '@common/crud'
import { NodeEnv } from '@infrastructure/environment'

/** ДТО ответа на запрос получения множества записей */
export class CrudGetManyResponseDTO<T> implements CrudResponseSuccessMany<T> {
  /** Сколько объектов запрашивается */
  limit: number

  /** Сколько объектов пропускается */
  offset: number

  /** Сколько всего объектов на всех страницах */
  total: number

  /** Данные */
  data: T[]

  /** Метаданные */
  meta?: { [key: string]: any }

  /** debug data */
  @ApiHideProperty()
    debugPayload?: any

  constructor(input: CrudResponseSuccessMany<T>) {
    this.limit = Number(input.limit)
    this.offset = Number(input.offset)
    this.total = Number(input.total)
    this.data = input.data
    this.meta = input.meta

    if (process.env.NODE_ENV !== NodeEnv.PRODUCTION) {
      this.debugPayload = input.debugPayload
    }
  }
}
