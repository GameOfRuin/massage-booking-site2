import { ValidationError } from 'class-validator'

/**
 * Преобразует вложенные ошибки валидации в плоский массив строк
 */
export function flatValidationErrors(errors: ValidationError[]): string[] {
  const messages: string[] = []

  for (const err of errors) {
    if (err.constraints) {
      messages.push(...Object.values(err.constraints))
    }
    if (err.children?.length) {
      messages.push(...flatValidationErrors(err.children))
    }
  }

  return messages
}
