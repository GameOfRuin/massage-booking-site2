import { randomBytes, createCipheriv, createDecipheriv } from 'node:crypto'

/** 
 * Шифрование и дешифрование данных с использованием AES-256-CTR 
 */
export class CryptoCipher {
  private static algorithm = 'aes-256-ctr'
  private static encoding: BufferEncoding = 'hex'

  /**
   * Шифрование данных
   */
  static encrypt(input: string | { [key: string]: any }, key: string[32]): string | null {
    if (typeof input === 'undefined' || input === null || input.length === 0) {
      return null
    }

    if (typeof key === 'undefined' || key === null || key.length !== 32) {
      return null
    }

    const text = typeof input === 'object' ? JSON.stringify(input) : input

    const iv = randomBytes(16)

    const cipher = createCipheriv(this.algorithm, key, iv)

    const encrypted = Buffer.concat([ cipher.update(text), cipher.final() ])

    return `${iv.toString(this.encoding)}:${encrypted.toString(this.encoding)}`
  }

  /**
   * Дешифрование данных
   */
  static decrypt(input: string, key: string[32]): string | { [key: string]: any } | null {
    try {
      if (typeof input === 'undefined' || input === null || input.toString().length === 0) {
        return null
      }

      if (typeof key === 'undefined' || key === null || key.length !== 32) {
        return null
      }

      const [ iv, data ] = input.toString().split(':')

      const decipher = createDecipheriv(this.algorithm, key, Buffer.from(iv, this.encoding))

      let result = Buffer.concat([ decipher.update(Buffer.from(data, this.encoding)), decipher.final() ]).toString()

      try {
        // JSON overload
        result = JSON.parse(result)
      } catch (e) { }

      return result
    } catch (err) {
      return undefined
    }
  }
}
