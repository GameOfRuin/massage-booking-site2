/** Направление сортировки */
export enum ListRequestOrderEnum {
  /** По возрастанию */
  ASC = 1,
  /** По убыванию */
  DESC = -1
}

/** Фильтр запроса списка */
export type ListRequestFilter<T> = {
  [key in keyof T]?: T[keyof T]
}

/** Сортировка запроса списка */
export type ListRequestOrder<T> = {
  [key in keyof T]?: ListRequestOrderEnum
}
