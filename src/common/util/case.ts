/** 
 * Преобразование camelCase в snake_case
 */
export const caseCamelToSnake = (s: string): string => s.replace(/[A-Z]/g, c => `_${c.toLowerCase()}`)

/** 
 * Преобразование snake_case в camelCase
 */
export const caseSnakeToCamel = s => s.replace(/_./g, x => x[1].toUpperCase())

/** 
 * Преобразование kebab-case в camelCase
 */
export const caseKebabToCamel = s => s.replace(/-./g, x => x[1].toUpperCase())
