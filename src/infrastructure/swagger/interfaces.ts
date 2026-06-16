/* eslint-disable @typescript-eslint/ban-types */

/** Интерфейс секции Swagger */
export interface ISwaggerSection {
  /** Название секции */
  title: string
  /** Название ссылки */
  linkTitle: string
  /** Модули */
  modules: Function[]
}
