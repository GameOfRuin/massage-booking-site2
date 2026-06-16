/** 
 * Проверка, является ли значение определено
 */
export function isDef<T>(value: T): value is Exclude<T, undefined> {
  return typeof value !== 'undefined'
}

/** 
 * Проверка, является ли значение undefined
 */
export function isUndef(value: any): value is undefined {
  return typeof value === 'undefined'
}

/** 
 * Проверка, является ли значение boolean
 */
export function isBool(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

/** 
 * Проверка, является ли значение null
 */
export function isNull(value: any): value is null {
  return value === null
}

/** 
 * Проверка, является ли значение null или undefined
 */
export function isNil(value: unknown): value is null | undefined {
  return value == null
}

/** 
 * Проверка, является ли значение строкой
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

/** 
 * Проверка, является ли значение числом
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

/** 
 * Проверка, является ли значение объектом
 */
export function isObject(value: unknown): value is { [key: string]: unknown } {
  return Object.prototype.toString.call(value) === '[object Object]'
}
