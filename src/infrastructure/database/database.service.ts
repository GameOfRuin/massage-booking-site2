import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { InjectDataSource } from '@nestjs/typeorm'
import { DatabaseSchema, DatabaseSchemaProceduresParameters } from '@infrastructure/database/schema'
import { DatabaseException } from '@common/exception'

@Injectable()
export class DatabaseService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  private stripSlashes = (str: string): string => str.replace(/\\(.)/g, '$1')

  private parseParameters(
    schema: string,
    procedure: string | number | symbol,
    parameters: {
      [key: string]: any
    }[]
  ): { argString: string, argArray: any[] } {
    const [ procedureParameters ] = parameters

    if (!procedureParameters) {
      return {
        argString: '',
        argArray: []
      }
    }

    const argArray = []
    const argString = []

    let index = 1

    for (const [ key, value ] of Object.entries(procedureParameters)) {
      const schemaProcedureParameters = DatabaseSchemaProceduresParameters[schema][procedure]

      if (value === undefined) {
        // if argument is undefined and doesn't have a default value add null else add nothing
        if (schemaProcedureParameters.includes(`${key}`)) {
          argArray.push(null)
          argString.push(`${key} := $${index}`)
        }
      } else {
        argArray.push(typeof value === 'string' ? this.stripSlashes(value) : value)
        argString.push(`${key} := $${index}`)
      }
      index++
    }

    return {
      argString: argString.join(', '),
      argArray
    }
  }

  public async call<
    K extends keyof DatabaseSchema,
    P extends keyof DatabaseSchema[K],
    R extends DatabaseSchema[K][P] extends(
      ...args: any[]) => any ? DatabaseSchema[K][P] : never,
  >(
    schema: K,
    procedure: P,
    ...parameters: Parameters<R> extends never ? [] : Parameters<R>
  ): Promise<ReturnType<R>> {
    try {
      const { argString, argArray } = this.parseParameters(schema, procedure, parameters)

      const query = `select * from ${schema}.${procedure.toString()}(${argString})`

      const queryResult = await this.dataSource.query(query, argArray)

      if (!queryResult.length) {
        return null as ReturnType<R>
      }

      if (queryResult.length === 1) {
        const objectKeys = Object.keys(queryResult[0])

        if (objectKeys.length === 1 && objectKeys[0] === procedure) {
          return queryResult[0][procedure] as ReturnType<R>
        }
      }

      return queryResult as ReturnType<R>
    } catch (error) {
      throw new DatabaseException({
        message: error.message
      }).setDebugPayload({
        code: error.code,
        query: error.query,
        parameters: error.parameters
      })
    }
  }
}
