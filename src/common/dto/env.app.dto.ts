import { EnvDefault } from '@infrastructure/environment'
import {
  IsBooleanString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
  Length
} from 'class-validator'

/** DTO для переменных окружения приложения */
export class EnvApp extends EnvDefault {
  /** Флаг отключения проверки прав */
  @IsOptional()
  @IsBooleanString()
    APP_DISABLE_PERMISSION_CHECK: string

  /** Секрет пароля */
  @IsString()
  @Length(32, 32)
    APP_PASSWORD_SECRET: string

  /** Секрет JWT токена */
  @IsString()
  @IsNotEmpty()
    APP_JWT_TOKEN_SECRET: string

  /** Время жизни JWT токена */
  @IsString()
  @IsNotEmpty()
    APP_JWT_TOKEN_EXPIRES: string

  /** Секрет JWT refresh токена */
  @IsString()
  @IsNotEmpty()
    APP_JWT_REFRESH_TOKEN_SECRET: string

  /** Время жизни JWT refresh токена */
  @IsString()
  @IsNotEmpty()
    APP_JWT_REFRESH_TOKEN_EXPIRES: string

  /** Количество попыток авторизации */
  @IsNumberString()
  @IsOptional()
    APP_AUTH_ATTEMPT_COUNT: string

  /** Секрет данных */
  @IsOptional()
  @IsString()
  @Length(32, 32)
    APP_DATA_SECRET: string

  /** Секрет S3 ключа */
  @IsString()
  @IsNotEmpty()
    APP_S3_KEY: string

  /** Секрет S3 секрета */
  @IsString()
  @IsNotEmpty()
    APP_S3_SECRET: string

  /** Имя S3 bucket */
  @IsString()
  @IsNotEmpty()
    APP_S3_BUCKET_PUBLIC: string

  /** Флаг принудительного использования пути стиля S3 */
  @IsOptional()
  @IsBooleanString()
    APP_S3_FORCE_PATH_STYLE: string

  /** Флаг удаления имени bucket из публичного URL S3 */
  @IsOptional()
  @IsBooleanString()
    APP_S3_PUBLIC_URL_REMOVE_BUCKET: string

  /** Регион S3 */
  @IsString()
  @IsNotEmpty()
    APP_S3_REGION: string

  /** Endpoint S3 */
  @IsString()
  @IsNotEmpty()
    APP_S3_ENDPOINT: string

  /** Публичный URL S3 */
  @IsUrl()
  @IsNotEmpty()
    APP_S3_PUBLIC_URL: string

  /** URL сервиса VK */
  @IsUrl()
  @IsNotEmpty()
    APP_VK_SERVICE_URL: string

  /** URL API Telegram */
  @IsUrl()
  @IsOptional()
    APP_TELEGRAM_API_URL: string

  /** URL API Webhook */
  @IsUrl({ require_tld: false })
  @IsNotEmpty()
    APP_WEBHOOK_API_URL: string

  /** Секрет Webhook */
  @IsString()
  @Length(32, 32)
    APP_WEBHOOK_SECRET: string

  /** Секрет Signature */
  @IsString()
  @IsNotEmpty()
    APP_SIGNATURE_SALT: string
}
