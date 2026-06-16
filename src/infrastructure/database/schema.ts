/*
AUTO GENERATED DO NOT MODIFY
"npm run migration:schema" to update
*/

/** Названия полов */
export enum pkg_ai_did_gender_enum {
  /** Женский */
  FEMALE = 'female',
  /** Мужской */
  MALE = 'male',
  /** Нейтральный */
  NEUTRAL = 'neutral',
}

/** Названия поставщиков */
export enum pkg_ai_did_provider_enum {
  /** Amazon */
  AMAZON = 'amazon',
  /** Azure OpenAI */
  AZURE_OPENAI = 'azure-openai',
  /** ElevenLabs */
  ELEVENLABS = 'elevenlabs',
  /** Google */
  GOOGLE = 'google',
  /** Microsoft */
  MICROSOFT = 'microsoft',
  /** PlayHT */
  PLAYHT = 'playHT',
}

/** Названия рас */
export enum pkg_ai_did_race_enum {
  /** Африканский */
  AFRICOID = 'africoid',
  /** Американский */
  AMERICAN = 'american',
  /** Австралийский */
  AUSTRALOID = 'australoid',
  /** Кавказский */
  CAUCASOID = 'caucasoid',
  /** Монгольский */
  MONGOLOID = 'mongoloid',
}

/** Названия действий в истории */
export enum pkg_history_history_action_enum {
  /** Создание */
  CREATE = 'create',
  /** Удаление */
  DELETE = 'delete',
  /** Восстановление */
  RECOVER = 'recover',
  /** Обновление */
  UPDATE = 'update',
}

/** Названия отношений в истории */
export enum pkg_history_history_relation_enum {
  /** Изображение */
  IMAGE = 'image',
  /** База знаний */
  KNOWLEDGEBASE = 'knowledgebase',
  /** Категория базы знаний */
  KNOWLEDGEBASE_CATEGORY = 'knowledgebase_category',
  /** Новости */
  NEWS = 'news',
  /** Категория новости */
  NEWS_CATEGORY = 'news_category',
  /** Организация */
  ORGANIZATION = 'organization',
  /** Разрешения */
  PERMISSION = 'permission',
  /** Роли */
  ROLE = 'role',
  /** Сценарий */
  SCENARIO = 'scenario',
  /** Папка сценария */
  SCENARIO_FOLDER = 'scenario_folder',
  /** Соединение модуля сценария */
  SCENARIO_MODULE_CONNECTION = 'scenario_module_connection',
  /** Шаг сценария */
  SCENARIO_STEP = 'scenario_step',
  /** Шаг сценария к шагу */
  SCENARIO_STEP_TO_STEP = 'scenario_step_to_step',
  /** Пользователь */
  USER = 'user',
  /** Видео */
  VIDEO = 'video',
}

/** Названия статусов авторизации */
export enum pkg_scenario_connection_auth_status_enum {
  /** Ошибка */
  ERROR = 'error',
  /** Истек срок действия */
  EXPIRED = 'expired',
  /** Нет */
  NONE = 'none',
  /** Ожидание */
  PENDING = 'pending',
  /** Успех */
  SUCCESS = 'success',
}

/** Типы запуска сценария */
export enum pkg_scenario_scenario_launch_type_enum {
  /** Ручной */
  MANUAL = 'manual',
  /** Планировщик */
  SCHEDULER = 'scheduler',
}

/** Названия алиасов модулей */
export enum pkg_scenario_scenario_module_alias_enum {
  /** Подписи */
  CAPTIONS = 'captions',
  /** DALL-E */
  DALLE = 'dalle',
  /** DeepSeek */
  DEEPSEEK = 'deepseek',
  /** DID */
  DID = 'did',
  /** ElevenLabs */
  ELEVENLABS = 'elevenlabs',
  /** Flow Control */
  FLOW_CONTROL = 'flow-control',
  GIGACHAT = 'gigachat',
  /** Google Table */
  GOOGLE_TABLE = 'google-table',
  /** GPT */
  GPT = 'gpt',
  /** Instagram */
  INSTAGRAM = 'instagram',
  /** Kandinsky */
  KANDINSKY = 'kandinsky',
  /** Kling */
  KLING = 'kling',
  /** Link */
  LINK = 'link',
  /** List */
  LIST = 'list',
  /** Midjourney */
  MIDJOURNEY = 'midjourney',
  /** OK */
  OK = 'ok',
  /** Prompt */
  PROMPT = 'prompt',
  /** RSS */
  RSS = 'rss',
  /** Scenario Content */
  SCENARIO_CONTENT = 'scenario-content',
  /** Sora 2 */
  SORA2 = 'sora2',
  /** Telegram */
  TELEGRAM = 'telegram',
  /** Telegram Scan */
  TELEGRAM_SCAN = 'telegram-scan',
  /** Telegram Trigger */
  TELEGRAM_TRIGGER = 'telegram-trigger',
  /** Terminal */
  TERMINAL = 'terminal',
  /** TikTok */
  TIKTOK = 'tiktok',
  /** Vizard */
  VIZARD = 'vizard',
  /** VKontakte */
  VK = 'vk',
  /** Yandex Table */
  YANDEX_TABLE = 'yandex-table',
  /** YouTube */
  YOUTUBE = 'youtube',
}

/** Типы соединений модулей */
export enum pkg_scenario_scenario_module_connection_type_enum {
  /** AI */
  AI = 'ai',
  /** System */
  SYSTEM = 'system',
  /** User */
  USER = 'user',
}

/** Статусы сценария */
export enum pkg_scenario_scenario_status_enum {
  /** Ошибка */
  ERROR = 'error',
  /** Готово */
  READY = 'ready',
  /** Выполняется */
  RUNNING = 'running',
}

/** Действия шага сценария */
export enum pkg_scenario_scenario_step_action_enum {
  /** Captions Translate Request */
  CAPTIONS_TRANSLATE_REQUEST = 'captions_translate_request',
  /** ChatGPT Request */
  CHATGPT_REQUEST = 'chatgpt_request',
  /** Condition */
  CONDITION = 'condition',
  /** DALL-E Request */
  DALLE_REQUEST = 'dalle_request',
  /** DeepSeek Request */
  DEEPSEEK_REQUEST = 'deepseek_request',
  /** Delete Message */
  DELETE_MESSAGE = 'delete_message',
  /** DID Request */
  DID_REQUEST = 'did_request',
  /** Edit Message */
  EDIT_MESSAGE = 'edit_message',
  /** ElevenLabs Create Speech Request */
  ELEVENLABS_CREATE_SPEECH_REQUEST = 'elevenlabs_create_speech_request',
  /** Finish */
  FINISH = 'finish',
  /** Forward Message */
  FORWARD_MESSAGE = 'forward_message',
  /** Gigachat Request */
  GIGACHAT_REQUEST = 'gigachat_request',
  INSTAGRAM_PUBLISH_POST = 'instagram_publish_post',
  /** Kandinsky Request */
  KANDINSKY_REQUEST = 'kandinsky_request',
  /** Kling Request */
  KLING_REQUEST = 'kling_request',
  LIST_ADD_ITEM = 'list_add_item',
  /** Midjourney Request */
  MIDJOURNEY_REQUEST = 'midjourney_request',
  /** Photo Recognition */
  PHOTO_RECOGNITION = 'photo_recognition',
  /** RSS Feed Load */
  RSS_FEED_LOAD = 'rss_feed_load',
  /** Scenario Content Channel */
  SCENARIO_CONTENT_CHANNEL = 'scenario_content_channel',
  /** Send Audio */
  SEND_AUDIO = 'send_audio',
  /** Send Document */
  SEND_DOCUMENT = 'send_document',
  /** Send Message */
  SEND_MESSAGE = 'send_message',
  /** Sora 2 Video Generate Request */
  SORA2_VIDEO_GENERATE_REQUEST = 'sora2_video_generate_request',
  /** Table Import */
  TABLE_IMPORT = 'table_import',
  /** Telegram Post Parser */
  TELEGRAM_POST_PARSER = 'telegram_post_parser',
  /** Telegram Trigger */
  TELEGRAM_TRIGGER = 'telegram_trigger',
  /** Terminal Data Filter */
  TERMINAL_DATA_FILTER = 'terminal_data_filter',
  /** Terminal Scenario Complete */
  TERMINAL_SCENARIO_COMPLETE = 'terminal_scenario_complete',
  /** Text Prompt */
  TEXT_PROMPT = 'text_prompt',
  /** TikTok Publish Video */
  TIKTOK_PUBLISH_VIDEO = 'tiktok_publish_video',
  /** URL Validate */
  URL_VALIDATE = 'url_validate',
  /** Vizard Request */
  VIZARD_REQUEST = 'vizard_request',
  /** VK Publish Clip */
  VK_PUBLISH_CLIP = 'vk_publish_clip',
  /** VK Wall Post */
  VK_WALL_POST = 'vk_wall_post',
  /** Wait */
  WAIT = 'wait',
  /** Yandex Sheets Sync */
  YANDEX_SHEETS_SYNC = 'yandex_sheets_sync',
  /** YouTube Publish Video */
  YOUTUBE_PUBLISH_VIDEO = 'youtube_publish_video',
}

/** Статусы задач сценария */
export enum pkg_scenario_scenario_task_status_enum {
  /** Отменено */
  CANCELLED = 'cancelled',
  /** Выполнено */
  COMPLETED = 'completed',
  /** Ошибка */
  FAILED = 'failed',
  /** Выполняется */
  IN_PROGRESS = 'in_progress',
  /** Ожидание */
  PENDING = 'pending',
}

/** Типы сценария */
export enum pkg_scenario_scenario_type_enum {
  /** Сценарий */
  SCENARIO = 'scenario',
  /** Шаблон */
  TEMPLATE = 'template',
}

/** Типы событий активности контента */
export enum pkg_scenario_content_scenario_content_activity_event_type_enum {
  /** Контент назначен */
  CONTENT_ASSIGNED = 'content_assigned',
  /** Ошибка получения контента */
  CONTENT_ERROR_RECEIVED = 'content_error_received',
  /** Контент получен */
  CONTENT_RECEIVED = 'content_received',
  /** Ошибка запроса контента */
  CONTENT_REQUEST_FAILED = 'content_request_failed',
  /** Контент запрошен */
  CONTENT_REQUESTED = 'content_requested',
  /** Ошибка публикации */
  PUBLISH_FAILED = 'publish_failed',
  /** Публикация успешна */
  PUBLISH_SUCCEEDED = 'publish_succeeded',
  /** Планировщик активирован */
  SCHEDULER_ACTIVATED = 'scheduler_activated',
  /** Планировщик деактивирован */
  SCHEDULER_DEACTIVATED = 'scheduler_deactivated',
  /** Слот создан */
  SLOT_CREATED = 'slot_created',
}

/** Типы целей публикации контента */
export enum pkg_scenario_content_scenario_content_publish_target_type_enum {
  /** Загрузка поста */
  UPLOAD_POST = 'upload_post',
  /** Вебхук */
  WEBHOOK = 'webhook',
}

/** Статусы слота контента */
export enum pkg_scenario_content_scenario_content_slot_status_enum {
  /** Назначен */
  ASSIGNED = 'assigned',
  /** Контент запрошен */
  CONTENT_REQUESTED = 'content-requested',
  /** Ошибка */
  FAILED = 'failed',
  /** Опубликован */
  PUBLISHED = 'published',
  /** Пустой */
  VACANT = 'vacant',
}

/** Форматы изображений */
export enum pkg_storage_image_format_enum {
  /** AVIF */
  AVIF = 'avif',
  /** DZ */
  DZ = 'dz',
  /** FITS */
  FITS = 'fits',
  /** GIF */
  GIF = 'gif',
  /** HEIF */
  HEIF = 'heif',
  /** INPUT */
  INPUT = 'input',
  /** JP2 */
  JP2 = 'jp2',
  /** JPEG */
  JPEG = 'jpeg',
  /** JPG */
  JPG = 'jpg',
  /** JXL */
  JXL = 'jxl',
  MAGICK = 'magick',
  /** OPENSLIDE */
  OPENSLIDE = 'openslide',
  /** PDF */
  PDF = 'pdf',
  /** PNG */
  PNG = 'png',
  /** PPM */
  PPM = 'ppm',
  /** RAW */
  RAW = 'raw',
  /** SVG */
  SVG = 'svg',
  /** TIF */
  TIF = 'tif',
  /** TIFF */
  TIFF = 'tiff',
  /** V */
  V = 'v',
  /** WEBP */
  WEBP = 'webp',
}

/** Отношения изображений */
export enum pkg_storage_image_relation_enum {
  /** Аватар */
  AVATAR = 'avatar',
  /** База знаний */
  KNOWLEDGEBASE = 'knowledgebase',
  /** Новость */
  NEWS = 'news',
  /** Уведомление */
  NOTIFICATION = 'notification',
  /** Шаг сценария */
  SCENARIO_STEP = 'scenario_step',
  /** Сообщение поддержки */
  SUPPORT_MESSAGE = 'support_message',
  /** Видео */
  VIDEO = 'video',
}

/** Форматы видео */
export enum pkg_storage_video_format_enum {
  /** MP4 */
  MP4 = 'mp4',
}

/** Отношения видео */
export enum pkg_storage_video_relation_enum {
  /** Шаг сценария вход */
  SCENARIO_STEP_INPUT = 'scenario_step_input',
}

/** Типы сообщений запроса поддержки */
export enum pkg_support_support_request_message_type_enum {
  /** Ответ */
  ANSWER = 'answer',
  /** Вопрос */
  QUESTION = 'question',
}

/** Статусы запроса поддержки */
export enum pkg_support_support_request_status_enum {
  /** Выполнено */
  DONE = 'done',
  /** Новый */
  NEW = 'new',
  /** Ожидание */
  WAIT = 'wait',
}

/** Статусы новости */
export enum news_status_enum {
  /** Черновик */
  DRAFT = 'draft',
  /** Опубликовано */
  PUBLISHED = 'published',
}

/** Названия типов уведомлений */
export enum notification_type_enum {
  /** Анонс */
  ANNOUNCEMENT = 'announcement',
  /** Сообщение задачи сценария */
  SCENARIO_TASK_MESSAGE = 'scenario_task_message',
  /** Ответ поддержки */
  SUPPORT_ANSWER = 'support_answer',
  /** Вопрос поддержки */
  SUPPORT_QUESTION = 'support_question',
  /** Запрос поддержки */
  SUPPORT_REQUEST = 'support_request',
}

/** Названия полов пользователей */
export enum user_gender_enum {
  /** Женский */
  FEMALE = 'female',
  /** Мужской */
  MALE = 'male',
}

/** Названия типов пользователей */
export type DatabaseSchema = {
  pkg_history: {
    history_create(params: {
      p_user_id: string
      p_action: pkg_history_history_action_enum
      p_relation: pkg_history_history_relation_enum
      p_relation_id: string
      p_old_record: { [key: string]: any }
      p_new_record: { [key: string]: any }
    }): string
    history_partition_create(params: {
      date_from: Date
      count: number
    }): void
  }
  pkg_snowflake: {
    snowflake_id_from_timestamp(params: {
      p_sequence_pattern: string
      p_sequence_schema?: string
      p_instance_id?: number
    }): string
    snowflake_id_to_timestamp(params: {
      p_snowflake_id: string
      p_custom_epoch?: string
    }): Date
    uuid_from_snowflake_id(params: {
      p_snowflake_id: string
    }): string
  }
}

/** Параметры процедур схемы базы данных */
export const DatabaseSchemaProceduresParameters = {
  pkg_history: {
    history_create: [
      'p_user_id',
      'p_action',
      'p_relation',
      'p_relation_id',
      'p_old_record',
      'p_new_record'
    ],
    history_partition_create: [
      'date_from',
      'count'
    ]
  },
  pkg_snowflake: {
    snowflake_id_from_timestamp: [
      'p_sequence_pattern',
      'p_sequence_schema?',
      'p_instance_id?'
    ],
    snowflake_id_to_timestamp: [
      'p_snowflake_id',
      'p_custom_epoch?'
    ],
    uuid_from_snowflake_id: [ 'p_snowflake_id' ]
  }
}
