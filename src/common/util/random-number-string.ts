/** 
 * Генерация случайной строки из цифр
 */
export const randomNumberString = (count: number): string => {
  if (count > 9) {
    throw new Error('Maximum length for string is 9')
  }

  let s = ''

  while (s.length < count) {
    let d = Math.ceil(Math.random() * 10)

    while (s.indexOf(d.toString()) >= 0 || d > 9) {
      d = Math.ceil(Math.random() * 10)
    }

    s = s + d.toString().substring(0, count)
  }

  return s
}
