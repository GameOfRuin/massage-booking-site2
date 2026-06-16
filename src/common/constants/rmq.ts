import 'dotenv/config'

/** События уведомлений */
export enum RmqNotificationEventPatternEnum {
  /** Создание уведомления */
  NOTIFICATION_CREATE = 'notification_create',
  /** Вебсокет */
  WEBSOCKET = 'websocket',
  /** FCM */
  // FCM = 'fcm',
  /** Email */
  MAIL = 'mail',
  /** SMS */
  SMS = 'sms',
}

/** События сценария */
export enum RmqScenarioEventPatternEnum {
  /** Запуск сценария */
  SCENARIO_START = 'scenario_start',
  /** Остановка сценария */
  SCENARIO_STOP = 'scenario_stop',
  /** Планировщик сценария */
  SCENARIO_SCHEDULER = 'scenario_scheduler',
}

export enum RmqTaskEventPatternEnum {
  /** Выполнение задачи */
  TASK_EXECUTE = 'task_execute',
  /** Завершение задачи */
  TASK_COMPLETED = 'task_completed',
  /** Ошибка в задаче */
  TASK_FAILED = 'task_failed',
  /** Невалидный токен авторизации */
  CONNECTION_AUTH_INVALID = 'connection_auth_invalid',
}

/** Очереди RMQ */
export enum RmqQueueEnum {
  /** Health check */
  HEALTH_CHECK = 'health_check',
  /** Уведомления */
  NOTIFICATION = 'notification',
  /** Менеджер задач */
  TASK_MANAGER = 'task-manager',
  /** Работник задач */
  TASK_WORKER = 'task-worker',
}

/** События сценария контента */
export enum RmqScenarioContentEventPatternEnum {
  /** Активация сценария контента */
  SCENARIO_CONTENT_ACTIVATE = 'scenario_content_activate',
  /** Деактивация сценария контента */
  SCENARIO_CONTENT_DEACTIVATE = 'scenario_content_deactivate',
  /** Обновление бота Telegram */
  TELEGRAM_BOT_UPDATE = 'telegram_bot_update',
  CONTENT_PARSE_SUCCESS_RECEIVED = 'content_parse_success_received',
  CONTENT_PARSE_ERROR_RECEIVED = 'content_parse_error_received',
  CONTENT_PROCESS_SUCCESS_RECEIVED = 'content_process_success_received',
  CONTENT_PROCESS_ERROR_RECEIVED = 'content_process_error_received',
}

export const RmqUrls = process.env.APP_RMQ_URL?.length ? [ (new URL(process.env.APP_RMQ_URL).href) ] : []
