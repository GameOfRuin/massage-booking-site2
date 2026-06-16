import { And, In, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, SelectQueryBuilder } from 'typeorm'
import {
  ListRequest,
  CrudResponseSuccessMany,
  TypeOrmUtils,
  FilterConditionEnum
} from '@common/crud'
import { ListRequestOrderEnum } from '@common/dto'

// Ограничение для производительности
export const MAX_GET_MANY_RESULT = 100

export class QueryBuilderUtils {
  /**
   * Helper, добавляет сортировку и пагинацию из дефолтного типа и DTO
   * для GetMany в typeORM QueryBuilder
   */
  static addPaginationFilterOrder<E, F, O>(
    qb: SelectQueryBuilder<E>,
    request: ListRequest<F, O>,
    defaultOrder?: O
  ) {
    QueryBuilderUtils.addPagination<E, F, O>(qb, request)
    QueryBuilderUtils.addFilter<E, F, O>(qb, request)
    QueryBuilderUtils.addOrder<E, F, O>(qb, request, defaultOrder)
  }

  /**
   * Helper, добавляет пагинацию типа и DTO
   * для GetMany в typeORM QueryBuilder
   */
  static addPagination<E, F, O>(
    qb: SelectQueryBuilder<E>,
    request: ListRequest<F, O>
  ) {
    if (request.offset) {
      qb.offset(request.offset)
    }

    if (request.limit === 0) {
      return
    }

    qb.limit(QueryBuilderUtils.getLimit(request.limit))
  }

  /**
   * Helper, считает данные пагинации для ответа GetMany
   */
  static buildPaginatedResponse<E>(
    data: E[],
    total: number,
    request: ListRequest<any, any>
  ): CrudResponseSuccessMany<E> {
    return {
      data,
      offset: request?.offset ?? 0,
      limit: request?.limit === 0 ? request?.limit : QueryBuilderUtils.getLimit(request?.limit),
      total
    }
  }

  /**
   * Helper для вычисления limit с учетом ограничений
   */
  static getLimit(limit?: number) {
    if (limit && Number.isInteger(limit) && limit > 0 && limit <= MAX_GET_MANY_RESULT) {
      return limit
    }

    return MAX_GET_MANY_RESULT
  }

  /**
   * Helper, добавляет сортировку из дефолтного типа и DTO
   * для GetMany в typeORM QueryBuilder
   */
  static addOrder<E, F, O>(
    qb: SelectQueryBuilder<E>,
    request: ListRequest<F, O>,
    defaultOrder?: O
  ) {
    const order = request?.order || defaultOrder

    if (!order || !(Object.keys(order)).length) {
      return
    }

    const entityFields =
      TypeOrmUtils.getEntityColumnsFromQueryBuilder<E>(qb)

    let fieldCount = 0

    const orderBy = {}

    for (const field of Object.keys(order)) {
      if (entityFields.includes(field)) {
        orderBy[`${qb.alias}.${field}`] = order[field] === ListRequestOrderEnum.ASC ? 'ASC' : 'DESC'
        fieldCount++
      }
    }

    if (fieldCount) {
      for (const field of Object.keys(orderBy)) {
        qb.addOrderBy(field, orderBy[field])
      }
    }
  }

  /**
   * Helper, добавляет условия из дефолтного типа и DTO
   * для GetMany в typeORM QueryBuilder
   */
  static addFilter<E, F, O>(
    qb: SelectQueryBuilder<E>,
    request: ListRequest<F, O>
  ) {
    if (!request?.filter || !(Object.keys(request?.filter)).length) {
      return
    }

    const entityFields =
      TypeOrmUtils.getEntityColumnsFromQueryBuilder<E>(qb)

    let fieldCount = 0

    const filter = {}

    for (const field of Object.keys(request.filter)) {
      if (entityFields.includes(field)) {
        const item = request.filter[field]

        if (Array.isArray(item)) {
          filter[field] = In(item)
        } else if (item !== null && typeof item !== 'undefined' && typeof item === 'object' && Object.keys(item).length > 0) {
          const conditionList = []

          for (const condition of Object.keys(item)) {
            switch (condition) {
              case FilterConditionEnum.GREATER: {
                conditionList.push(MoreThan(item[condition]))
                break
              }
              case FilterConditionEnum.GREATER_OR_EQUAL: {
                conditionList.push(MoreThanOrEqual(item[condition]))
                break
              }
              case FilterConditionEnum.LESS: {
                conditionList.push(LessThan(item[condition]))
                break
              }
              case FilterConditionEnum.LESS_OR_EQUAL: {
                conditionList.push(LessThanOrEqual(item[condition]))
                break
              }
            }
          }

          if (conditionList.length === 1) {
            filter[field] = conditionList[0]
          } else {
            filter[field] = And(...conditionList)
          }
        } else {
          filter[field] = request.filter[field]
        }

        fieldCount++
      }
    }

    if (fieldCount) {
      qb.where(filter)
    }
  }

  /**
   * Helper, получает SQL запрос и параметры из typeORM QueryBuilder
   */
  static getSql<E>(qb: SelectQueryBuilder<E>): string {
    let [ sql, params ] = qb.getQueryAndParameters()

    params.forEach((value, i) => {
      const index = '$' + (i + 1)

      switch (typeof value) {
        case 'object':
          if (Array.isArray(value)) {
            sql = sql.replace(
              index,
              value.map(element => (typeof element === 'boolean' ? element.toString() : `'${element}'`)).join(',')
            )
          } else {
            sql = sql.replace(index, value)
          }
          break
        case 'number':
          sql = sql.replace(index, `'${value.toString()}'`)
          break
        case 'boolean':
          sql = sql.replace(index, value.toString())
          break
        default:
          sql = sql.replace(index, `'${value}'`)
      }
    })

    return sql
  }
}
