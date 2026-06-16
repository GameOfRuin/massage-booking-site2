/** Типы ошибок приложения */
export enum AppErrorType {
  /** Проверка работоспособности */
  HEALTHCHECK = 'healthcheck',
  /** Общие */
  COMMON = 'common',
  /** База данных */
  DATABASE = 'database',
  /** Валидация */
  VALIDATOR = 'validator',
  /** Некорректный запрос */
  BAD_REQUEST = 'bad_request',
  /** Неавторизованный запрос */
  UNAUTHORIZED = 'unauthorized',
  /** Требуется покупка */
  PURCHASE_REQUIRED = 'purchase_required',
  /** Запрещено */
  FORBIDDEN = 'forbidden',
  /** Не найдено */
  NOT_FOUND = 'not_found',
  /** Метод не разрешен */
  METHOD_NOT_ALLOWED = 'method_not_allowed',
  /** Неприемлемо */
  NOT_ACCEPTABLE = 'not_acceptable',
  /** Требуется прокси-аутентификация */
  PROXY_AUTHENTICATION_REQUIRED = 'proxy_authentication_required',
  /** Запрос превысил время ожидания */
  REQUEST_TIMEOUT = 'request_timeout',
  /** Конфликт */
  CONFLICT = 'conflict',
  /** Удалён */
  GONE = 'gone',
  /** Длина обязательна */
  LENGTH_REQUIRED = 'length_required',
  /** Предусловие не выполнено */
  PRECONDITION_FAILED = 'precondition_failed',
  /** Пакет слишком большой */
  PAYLOAD_TOO_LARGE = 'payload_too_large',
  /** URI слишком длинный */
  URI_TOO_LONG = 'uri_too_long',
  /** Неподдерживаемый тип медиа */
  UNSUPPORTED_MEDIA_TYPE = 'unsupported_media_type',
  /** Запрошенный диапазон не удовлетворителен */
  REQUESTED_RANGE_NOT_SATISFIABLE = 'requested_range_not_satisfiable',
  /** Ожидание не выполнено */
  EXPECTATION_FAILED = 'expectation_failed',
  /** Я - чашка чая */
  I_AM_A_TEAPOT = 'i_am_a_teapot',
  /** Перенаправлен */
  MISDIRECTED = 'misdirected',
  /** Необрабатываемый */
  UNPROCESSABLE_ENTITY = 'unprocessable_entity',
  /** Сбой зависимости */
  FAILED_DEPENDENCY = 'failed_dependency',
  /** Предусловие требуется */
  PRECONDITION_REQUIRED = 'precondition_required',
  /** Слишком много запросов */
  TOO_MANY_REQUESTS = 'too_many_requests',
  /** Внутренняя ошибка сервера */
  INTERNAL_SERVER_ERROR = 'internal_server_error',
  /** Не реализовано */
  NOT_IMPLEMENTED = 'not_implemented',
  /** Плохой шлюз */
  BAD_GATEWAY = 'bad_gateway',
  /** Сервис недоступен */
  SERVICE_UNAVAILABLE = 'service_unavailable',
  /** Gateway timeout */
  GATEWAY_TIMEOUT = 'gateway_timeout',
  /** HTTP версия не поддерживается */
  HTTP_VERSION_NOT_SUPPORTED = 'http_version_not_supported'
}
