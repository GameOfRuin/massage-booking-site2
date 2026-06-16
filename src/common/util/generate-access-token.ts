/** 
 * Генерация токена доступа
 */
export const generateAccessToken = (length: number = 6): string => {
  const chars = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789'
  let token = ''

  while (token.length !== length) {
    const char = chars[Math.floor(Math.random() * chars.length)]

    if (token.indexOf(char) === -1) {
      token += char
    }
  }

  return token
}
