import { ValidationError } from '@nestjs/common'

import { IAppException } from '.'
import { AppClassValidatorException } from '.'

/**
 * Фабрика для создания исключения валидации.
 */
export function ClassValidatorExceptionFactory(errors: ValidationError[]): IAppException {
  return new AppClassValidatorException()
    .setPayload({ errors })
    .setDebugPayload({ errors })
}
