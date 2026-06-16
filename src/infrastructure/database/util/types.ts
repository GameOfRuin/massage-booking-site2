import { OnUpdateType } from 'typeorm/metadata/types/OnUpdateType'
import { OnDeleteType } from 'typeorm/metadata/types/OnDeleteType'

/** Тип перечисления в базе данных */
export type TEnum = {
  /** Схема */
  schema?: string
  /** Название */
  name?: string
  /** Значения */
  values?: string[]
  /** Название переменной */
  varname?: string
  /** Название файла */
  filename?: string
}

/** Тип таблицы в базе данных */
export type TTable = {
  /** Схема */
  table_schema: string
  /** Название */
  table_name: string
  /** Тип */
  type?: string
  /** Владелец */
  owner?: string
  /** Название интерфейса */
  interfaceName?: string
  /** Название файла интерфейса */
  interfaceFilename?: string
  /** Название сущности */
  entityName?: string
  /** Название файла сущности */
  entityFilename?: string
  /** Столбцы в виде массива объектов {@link TColumn} */
  columns?: TColumn[]
  /** Внешние ключи в виде массива объектов {@link TForeignKey} */
  foreignKeys?: TForeignKey[]
  /** Индексы в виде массива объектов {@link TIndex}*/
  indices?: TIndex[]
}

/** Тип столбца в базе данных */
export type TColumn = {
  /** Название первичного ключа */
  primary_key_name: string
  /** Название столбца */
  column_name: string
  /** Тип данных */
  data_type: string
  /** Значение по умолчанию */
  column_default: string
  /** Является ли столбец nullable */
  is_nullable: boolean
  /** Максимальная длина символов */
  character_maximum_length: number
  /** Точность числа */
  numeric_precision: number
  /** Основание системы счисления */
  numeric_precision_radix: number
  /** Масштаб числа */
  numeric_scale: number
  /** Тип генерации */
  generated_type: string
  /** Является ли столбец сгенерированным */
  is_generated: boolean
  /** Выражение генерации */
  generation_expression: string
  /** Схема типа данных */
  udt_schema: string
  /** Название типа данных */
  udt_name: string
}

/** Тип внешнего ключа в базе данных */
export type TForeignKey = {
  /** Название ограничения */
  constraint_name: string
  /** Название столбца */
  column_name: string
  /** Название таблицы */
  foreign_table_name: string
  /** Название столбца внешнего ключа */
  foreign_column_name: string
  /** Тип обновления */
  on_update: OnUpdateType
  /** Тип удаления */
  on_delete: OnDeleteType
}

/** Тип индекса в базе данных */
export type TIndex = {
  /** Название таблицы */
  table_name: string
  /** Название индекса */
  index_name: string
  /** Тип индекса */
  index_type: string
  /** Названия столбцов индекса */
  index_columns: string[]
  /** Является ли индекс уникальным */
  is_unique: boolean
  /** Является ли индекс первичным */
  is_primary: boolean
  /** Является ли индекс полнотекстовым */
  is_fulltext: boolean
  /** Является ли индекс обычным */
  is_index: boolean
}
