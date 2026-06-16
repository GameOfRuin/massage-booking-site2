/** Базовые служебные поля любой сущности. */
export interface IEntityBase {
  /** Дата и время создания записи */
  created_at?: Date
  /** Дата и время последнего обновления */
  updated_at?: Date
  /** Дата и время удаления */
  deleted_at?: Date
}
