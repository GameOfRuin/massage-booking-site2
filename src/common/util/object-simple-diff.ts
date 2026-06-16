const isObject = obj => obj === Object(obj)

/** 
 * Сравнение двух объектов
 * */
export function ObjectSimpleDiff(
  obj1: { [key: string]: any },
  obj2: { [key: string]: any },
  exclude = [ 'updated_by', 'updated_at' ]
): { [key: string]: [] } | null {
  const blackListKeys = [ 'password' ]

  if (
    obj1 === null || obj1 === undefined ||
    obj2 === null || obj2 === undefined ||
    typeof obj1 !== 'object' ||
    typeof obj2 !== 'object' ||
    Object.keys(obj1).length === 0 ||
    Object.keys(obj2).length === 0
  ) {
    return null
  }

  const result = {}

  for (const k of Object.keys(obj2)) {
    const v1 = isObject(obj1[k]) ? JSON.stringify(obj1[k]) : obj1[k]
    const v2 = isObject(obj2[k]) ? JSON.stringify(obj2[k]) : obj2[k]

    if (!exclude.includes(k) && v1 !== v2) {
      if (blackListKeys.includes(k)) {
        result[k] = [ '***', '***' ]
      } else {
        result[k] = [ obj1[k], obj2[k] ]
      }
    }
  }

  return Object.keys(result).length === 0 ? null : result
}
