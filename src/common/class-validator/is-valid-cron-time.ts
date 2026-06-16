import {
  registerDecorator,
  ValidationOptions
} from 'class-validator'
import cron from 'node-cron'

/**
 * Валидатор cron-времени
 */
export function IsValidCronTime(validationOptions?: ValidationOptions) {
  return function(object: object, propertyName: string) {
    registerDecorator({
      name: 'cronIsNotValid',
      target: object.constructor,
      propertyName,
      constraints: [ propertyName ],
      options: validationOptions,
      validator: {
        validate(value: string, args): boolean {
          if (value === '') {
            return true
          }

          try {
            if (!value) {
              this.message = `${propertyName} не определено`

              return false
            }

            return cron.validate(value)
          } catch (e) {
            this.message = e.message
          }

          return false
        },
        defaultMessage(args) {
          if (this.message) {
            return this.message
          } else {
            return `${args.property} должно быть корректным cron-выражением (например, "* * * * *")`
          }
        }
      }
    })
  }
}
