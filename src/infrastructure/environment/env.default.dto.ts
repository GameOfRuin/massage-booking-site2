import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsPort,
  IsIP,
  IsUrl,
  IsOptional,
  ValidateIf
} from 'class-validator'
import { LogLevel, NodeEnv } from '@infrastructure/environment'

/** DTO для переменных окружения по умолчанию */
export class EnvDefault {
  /** Название окружения */
  @IsEnum(NodeEnv)
    NODE_ENV: NodeEnv

  /** Название приложения */
  @IsString()
  @IsNotEmpty()
    APP_NAME: string

  /** Уровень логирования */
  @IsNotEmpty()
  @IsEnum(LogLevel)
    APP_LOG_LEVEL: LogLevel

  /** Черный список логирования */
  @IsNotEmpty()
  @IsString()
    APP_LOG_BLACKLIST: string

  /** Порт приложения */
  @IsNotEmpty()
  @IsPort()
    APP_PORT: string

  /** IP адрес приложения */
  @IsIP()
  @IsNotEmpty()
    APP_HOST: string

  /** URL фронтенда */
  @IsString()
  @IsNotEmpty()
    APP_FRONTEND_URL: string

  /** DNS Sentry */
  @IsOptional()
  @IsUrl()
    APP_SENTRY_DNS: string

  /** Хост базы данных */
  @IsString()
  @IsOptional()
    APP_DB_HOST: string

  /** Порт базы данных */
  @ValidateIf(o => o.APP_DB_HOST)
  @IsNotEmpty()
  @IsPort()
    APP_DB_PORT: string

  /** Пользователь базы данных */
  @ValidateIf(o => o.APP_DB_HOST)
  @IsString()
  @IsNotEmpty()
    APP_DB_USER: string

  /** Пароль базы данных */
  @ValidateIf(o => o.APP_DB_HOST)
  @IsString()
  @IsNotEmpty()
    APP_DB_PASSWORD: string

  /** Название базы данных */
  @ValidateIf(o => o.APP_DB_HOST)
  @IsString()
  @IsNotEmpty()
    APP_DB_NAME: string

  /** Схема базы данных */
  @ValidateIf(o => o.APP_DB_HOST)
  @IsString()
  @IsNotEmpty()
    APP_DB_SCHEMA: string
}
