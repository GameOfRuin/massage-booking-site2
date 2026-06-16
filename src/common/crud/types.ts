/** Запрос списка */
export type ListRequest<F, O> = {
  /** Фильтры */
  filter?: F
  /** Сортировка */
  order?: O
  /** Количество выбираемых записей */
  limit?: number
  /** Количество пропускаемых записей */
  offset?: number
}

/** Запрос получения множества записей */
export type CrudGetManyRequest<T> = {
  /** Поиск */
  search?: any
  /** Сортировка */
  order?: [keyof T, 'ASC' | 'DESC'][]
  /** Количество выбираемых записей */
  limit?: number
  /** Количество пропускаемых записей */
  offset?: number
}

/**
 * Общий тип ошибки, возвращаемой из сервиса
 */
export type CrudResponseError = {
  /** Успешно ли выполнено */
  success: false
  /** Код ошибки */
  errorCode: string
}

/**
 * Общий тип успешного результата, возвращаемого из сервиса
 */
export type CrudResponseSuccess<T> = {
  /** Успешно ли выполнено */
  success: true
} & T

/**
 * Общий тип успешного результата для GetMany, возвращаемого из сервиса
 */
export type CrudResponseSuccessMany<E> = {
  /** Успешно ли выполнено */
  success?: true
  /** Количество запрошенных объектов */
  limit: number
  /** Количество пропускаемых объектов */
  offset: number
  /** Общее количество объектов */
  total: number
  /** Результаты */
  data: E[]
  /** Метаданные */
  meta?: { [key: string]: any }
  /** debug data */
  debugPayload?: any
}

/**
 * Общий тип результата, возвращаемого из сервиса
 */
export type CrudResponse<T> = CrudResponseError | CrudResponseSuccess<T>

/**
 * Общий тип результата для GetMany, возвращаемого из сервиса
 */
export type CrudResponseMany<T> =
  | CrudResponseError
  | CrudResponseSuccessMany<T>

/**
 * Общий тип результата для delete, возвращаемый из сервиса
 */
export type CrudDeleteResponse = CrudResponseError | { success: true }

/**
 * Общий тип результата для операций без возвращаемого значения, возвращаемый из сервиса
 */
export type CrudVoidResponse = CrudResponseError | { success: true }
