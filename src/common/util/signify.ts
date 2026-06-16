import { createHash } from 'node:crypto'

/** 
 * Класс для работы с подписью
 */
export class Signify {
  private static valueDivider = ','

  private static keyValueDivider = ';'

  private static keyDivider = '->'

  static signatureKey = 'signature'

  static toString(payload: { [key: string]: any }, signatureKey?: string, prefix?: string): string {
    let result = ''

    for (const key of
      Object.keys(payload)
        .filter(v => v !== (signatureKey || this.signatureKey))
        .sort()
    ) {
      if (payload[key] instanceof Date && payload[key]) {
        result += `${prefix ? prefix + this.keyDivider : ''}${key}=${payload[key].toISOString()}${this.keyValueDivider}`
      } else if (payload[key] instanceof Array && payload[key] && payload[key].length) {
        result += `${key}=${payload[key].sort().join(this.valueDivider)}${
          this.keyValueDivider
        }`
      } else if (typeof payload[key] === 'object' && payload[key]) {
        result += this.toString(
          payload[key],
          signatureKey,
          `${prefix ? prefix + this.keyDivider : ''}${key}`
        )
      } else {
        result += `${prefix ? prefix + this.keyDivider : ''}${key}=${payload[key]}${this.keyValueDivider}`
      }
    }

    return result
  }

  static signatureMake<T extends object>(payload: T, salt: string, signatureKey?: string): string {
    const str = this.toString(payload, signatureKey)

    return createHash('sha256')
      .update(`${str}${salt}`)
      .digest('hex')
  }

  static signPayload<T extends object>(payload: T, salt: string, signatureKey?: string): T {
    return {
      [signatureKey || this.signatureKey]: this.signatureMake(payload, salt, signatureKey),
      ...payload
    }
  }

  static verifyPayload(payload: { [key: string]: any }, salt: string, signatureKey?: string): boolean {
    if (!payload?.signature) {
      return false
    }

    return payload.signature === this.signatureMake(payload, salt, signatureKey)
  }
}
