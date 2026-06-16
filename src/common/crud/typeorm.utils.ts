import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder'
/**
 * Набор вспомогательных утилит для typeorm
 */
export class TypeOrmUtils {
  /**
   * Получить список колонок таблицы из typeorm query builder,
   * если query builder был создан для конкретной entity с алиасом.
   * Используется для дополнительной валидации входящих параметров и проверки существования колонки
   */
  static getEntityColumnsFromQueryBuilder<E>(qb: SelectQueryBuilder<E>): string[] {
    const metadata = qb.connection.getMetadata(qb.alias)

    if (metadata) {
      return metadata.columns.map(column => column.propertyName)
    }

    return []
  }
}
