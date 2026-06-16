import { InternalServerErrorException } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'
import { EnvApp } from '@common/dto'
import { ValidationError } from 'class-validator/types/validation/ValidationError'

/** Валидация переменных окружения 
 */
export function EnvValidator(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(
    EnvApp,
    config,
    { enableImplicitConversion: true }
  )

  const errors = validateSync(validatedConfig, { skipMissingProperties: false })

  if (errors.length > 0) {
    const message = `Application environment variables validation has the following errors: ${validationErrorsConstraintsMessages(errors).join(', ')}`

    throw new InternalServerErrorException(message)
  }

  return validatedConfig
}

/** Получение сообщений об ошибках валидации
 */
function validationErrorsConstraintsMessages(errors: ValidationError[]): Array<string> {
  return errors.reduce((acc, error) => {
    for (const constraint of Object.keys(error.constraints)) {
      acc.push(error.constraints[constraint])
    }

    return acc
  }, [])
}
