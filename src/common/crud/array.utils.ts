/**
 * Утилита по работе с массивами 
 */
export class ArrayUtils {
  /**
   * Безопасно проверить является ли переменная массивом
   */
  static isArray(input): boolean {
    return typeof input === 'object' && Array.isArray(input)
  }

  /**
   * Безопасно проверить является ли переменная кортежем (массивом фиксированной длины)
   */
  static isTuple(input, length: number) {
    return ArrayUtils.isArray(input) && input.length === length
  }
}
