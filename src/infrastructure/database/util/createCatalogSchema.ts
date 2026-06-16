/* eslint-disable no-console */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import * as path from 'path'
import { DataSource } from 'typeorm'

import { dataSource } from '../typeorm.config'
import { PgTypeMap } from './constants'

/** Конвертер типов PostgreSQL */
class PostgresTypesConverter {
  private db: DataSource

  private header = `/*
AUTO GENERATED DO NOT MODIFY
"npm run migration:schema" to update
*/`

  private typeMap = PgTypeMap

  private procedureObject

  private databaseSchemaTypeName = 'DatabaseSchema'
  private databaseSchemaParametersConstantName = 'DatabaseSchemaProceduresParameters'

  constructor(db: DataSource) {
    this.db = db
  }

  /**
   * Содержимое файла схемы каталога в базе данных
   */
  public async getSchemaFileContent(): Promise<string> {
    const content = [
      this.header,
      // also mutates this.typeMap
      await this.getEnumString(),
      // also mutates this.typeMap
      await this.getTypeString(),
      await this.getProcedureTypeString(),
      await this.getProcedureParamsString()
    ]

    return content.reduce(
      (acc, value, currentIndex) =>
        acc + value + (currentIndex === content.length - 1 ? '\n' : (currentIndex !== content.length - 1 && content[currentIndex + 1].length ? '\n\n' : ''))
      , ''
    )
  }

  /**
   * Преобразование Routines в строку типов в базе данных
   */
  private routinesToTypeString = (routines: [
    {
      routine: string
      parsedParams: { [key: string]: string } | object
      parsedReturnType: { [key: string]: string } | string
    }
  ]): string =>
    routines.reduce((acc, { routine, parsedParams, parsedReturnType }) => {
      const indent = ' '.repeat(4)

      return `${acc}\n${indent}${routine}(${PostgresTypesConverter.paramsToParamsString(parsedParams)}): ${PostgresTypesConverter.returnTypeToString(parsedReturnType)}`
    }, '')

  /**
   * Преобразование Routines в строку параметров в базе данных
   */
  private routinesToParamsString = (routines: [
    {
      routine: string
      parsedParams: { [key: string]: string } | object
      parsedReturnType: { [key: string]: string } | string
    }
  ]): string =>
    routines.reduce((acc, { routine, parsedParams }, currentIndex) => {
      const indent = ' '.repeat(4)

      return `${acc}\n${indent}${routine}: ${PostgresTypesConverter.paramsToTypeString(parsedParams, currentIndex !== routines.length - 1)}`
    }, '')

  /**
   * Строка типов процедур в базе данных
   */
  private async getProcedureTypeString(): Promise<string> {
    const indent = ' '.repeat(2)
    const procedures = await this.getProcedureObject()
    const header = `export type ${this.databaseSchemaTypeName} = {`
    const body = Object.entries(procedures).reduce(
      (acc, [ schema, routines ]) => {
        const routinesString = this.routinesToTypeString(routines)

        return `${acc}\n${indent}${schema}: {${routinesString}\n${indent}}`
      },
      ''
    )

    const footer = '\n}'

    return `${header}${body}${footer}`
  }

  /**
   * Строка параметров процедур в базе данных
   */
  private async getProcedureParamsString(): Promise<string> {
    const indent = ' '.repeat(2)
    const procedures = await this.getProcedureObject()

    const entries = Object.entries(procedures)

    const header = `export const ${this.databaseSchemaParametersConstantName} = {`
    const body = entries.reduce(
      (acc, [ schema, routines ], currentIndex) => {
        const routinesString = this.routinesToParamsString(routines)

        return `${acc}\n${indent}${schema}: {${routinesString}\n${indent}}${currentIndex !== entries.length - 1 ? ',' : '' }`
      },
      ''
    )

    const footer = '\n}'

    return `${header}${body}${footer}`
  }

  /**
   * Объект процедур в базе данных
   */
  private async getProcedureObject(): Promise<{
    [key: string]: [
      {
        routine: string
        parsedParams: { [key: string]: string } | object
        parsedReturnType: { [key: string]: string } | string
      }
    ]
  }> {
    if (!this.procedureObject) {
      const procedureQuery = await this.procedureQuery()
      const procedurePromises = procedureQuery.map(async procedure => {
        const { schema, routine, params, returns } = procedure
        // parse params
        const parsedParams = params
          // split buy ', ' but not when inside [] or ()
          .split(new RegExp(', (?![^[]*])(?!\\S+\\()'))
          .filter(v => v)
          .reduce((acc, nameAndType) => {
            const [ nameString, ...typeArray ] = nameAndType.split(' ')
            const typeString = typeArray.join(' ')
            const defaultMatch = typeString.match('.+(?= DEFAULT)')
            if (defaultMatch) {
              return {
                ...acc,
                ...{ [`${nameString}?`]: this.mapType(defaultMatch[0]) }
              }
            }

            return {
              ...acc,
              ...{ [nameString]: this.mapType(typeString) }
            }
          }, {})

        // parse returns
        let parsedReturnType

        // check for TABLE
        const tableRegex = returns.match('(?<=TABLE\\()[a-zA-Z_0-9 ,".[\\]]+')

        if (tableRegex) {
          parsedReturnType = tableRegex[0]
            .split(', ')
            .reduce((acc, nameAndType) => {
              const [ name, ...type ] = nameAndType.split(' ')

              return {
                ...acc,
                ...{ [name.replace(/"/g, '')]: this.mapType(type.join(' ')) }
              }
            }, {})
        } else {
          // check for SETOF
          const setOfRegex = returns.match('(?<=SETOF )[a-zA-Z_0-9 ,".[\\]]+')

          if (setOfRegex) {
            const originalReturnType = `${setOfRegex[0].replace(new RegExp('"', 'g'), '')}[]`
            parsedReturnType = this.mapType(originalReturnType)
          }
        }

        // default fallback
        parsedReturnType = parsedReturnType || this.mapType(returns)

        return {
          schema,
          routine,
          parsedParams,
          parsedReturnType
        }
      })

      const procedures = await Promise.all(procedurePromises)

      this.procedureObject = procedures.reduce(
        (acc, { schema, routine, parsedParams, parsedReturnType }) => {
          if (!(schema in acc)) {
            Object.assign(acc, { [schema]: [] })
          }
          acc[schema].push({
            routine,
            parsedParams,
            parsedReturnType
          })

          return acc
        },
        {}
      )
    }

    return this.procedureObject
  }

  /**
   * Преобразование типа PostgreSQL в строку в базе данных
   */
  private mapType(postgresType: string): string {
    const arrayRegex = postgresType.match('[a-zA-Z0-9 ,._"]+(?=\\[])')
    if (arrayRegex) {
      const type = this.typeMap[arrayRegex[0]]

      return type ? `${type}[]` : 'any[]'
    }

    return this.typeMap[postgresType] || 'any'
  }

  /**
   * Преобразование параметров в строку параметров в базе данных
   */
  static paramsToParamsString(params: { [key: string]: string } | object): string {
    const entries = Object.entries(params)
    if (!entries.length) {
      return ''
    }

    const header = 'params: {'

    const body = entries.reduce((acc, [ key, value ]) => {
      const indent = ' '.repeat(6)

      return `${acc}\n${indent}${key}: ${value}`
    }, '')

    const indent = ' '.repeat(4)
    const footer = `\n${indent}}`

    return `${header}${body}${footer}`
  }

  /**
   * Преобразование параметров в строку типов в базе данных
   */
  static paramsToTypeString(
    params: { [key: string]: string } | object,
    addSemicolon = false
  ): string {
    const entries = Object.entries(params)

    if (!entries.length) {
      return `[]${addSemicolon ? ',' : ''}`
    }

    if (entries.length === 1) {
      return `[ '${entries[0][0]}' ]${addSemicolon ? ',' : ''}`
    }

    const header = '['

    const body = entries.reduce((acc, [ param ], currentIndex) => {
      const indent = ' '.repeat(6)

      return `${acc}\n${indent}'${param}'${currentIndex !== entries.length - 1 ? ',' : ''}`
    }, '')

    const indent = ' '.repeat(4)

    const footer = `\n${indent}]${addSemicolon ? ',' : ''}`

    return `${header}${body}${footer}`
  }

  /**
   * Преобразование типа возврата в строку в базе данных
   */
  static returnTypeToString(returnType: { [key: string]: string } | string): string {
    if (typeof returnType === 'object') {
      const header = '{'
      const indent = ' '.repeat(12)
      const body = Object.entries(returnType).reduce(
        (acc, [ key, value ]) => `${acc}\n${indent}${key}: ${value},`,
        ''
      )
      const footerIndent = ' '.repeat(6)
      const footer = `\n${footerIndent}}[]`

      return `${header}${body}${footer}`
    }

    return returnType
  }

  /**
   * Метод получения строки из enum в базе данных
   */
  private async getEnumString(): Promise<string> {
    const enumObject = await this.getEnumObject()

    const entries = Object.entries(enumObject)

    const reRus = /[а-я]/i

    const indent = ' '.repeat(2)

    return entries.reduce((acc, [ enumName, enumValues ], currentIndex) => {
      if (reRus.test(enumValues.join(''))) {
        return acc
      }

      const header = `${acc}export enum ${enumName} {\n`

      const body = enumValues
        .map((enumValue, currentIndex) => `${indent}${enumValue.replace('-', '_').toUpperCase()} = '${enumValue}',`)
        .join('\n')

      const footer = '\n}' + (currentIndex !== entries.length - 1 ? '\n\n' : '')

      return `${header}${body}${footer}`
    }, '')
  }

  /**
   * Объект enum в базе данных
   */
  private async getEnumObject(): Promise<{ [key: string]: string[] }> {
    const enumQuery = await this.enumQuery()

    // update typeMap with db enum types
    this.typeMap = {
      ...this.typeMap,
      ...enumQuery.reduce((acc, { schema, name }) => {
        if (schema === 'public') {
          return {
            ...acc,
            ...{ [name]: name }
          }
        }

        return {
          ...acc,
          ...{ [`${schema}.${name}`]: `${schema}_${name}` }
        }
      }, {})
    }

    return enumQuery.reduce((acc, { schema, name, values }) => {
      const valuesArray = values.split(',')
      if (schema === 'public') {
        return {
          ...acc,
          ...{ [name]: valuesArray }
        }
      }

      return {
        ...acc,
        ...{ [`${schema}_${name}`]: valuesArray }
      }
    }, {})
  }

  /**
   * Строка типов в базе данных
   */
  private async getTypeString(): Promise<string> {
    const indent = ' '.repeat(4)
    const parseType = (type: { [key: string]: string }) =>
      Object.entries(type).reduce((acc, [ key, value ], index) => {
        const linebreak = index ? '\n' : ''

        return `${acc}${linebreak}${indent}${key}: ${this.mapType(value)},`
      }, '')

    const typeQuery = await this.typeQuery()

    // update typeMap with custom db types
    this.typeMap = {
      ...this.typeMap,
      ...typeQuery.reduce((acc, { schema, name }) => {
        if (schema === 'public') {
          return {
            ...acc,
            ...{ [name]: name }
          }
        }

        return {
          ...acc,
          ...{ [`${schema}.${name}`]: `${schema}_${name}` }
        }
      }, {})
    }

    return typeQuery.reduce((acc, { schema, name, type }, index) => {
      const linebreak = index ? '\n\n' : ''
      const typeName = schema === 'public' ? name : `${schema}_${name}`
      const header = `${acc}${linebreak}export type ${typeName} = {\n`
      const body = parseType(type)
      const footer = '\n}'

      return `${header}${body}${footer}`
    }, '')
  }

  /**
   * Запрос на enum в базе данных
   */
  private async enumQuery(): Promise<{ schema: string, name: string, values: string }[]> {
    return this.db.query(`select
        n.nspname as schema,
        t.typname as name,
        (select string_agg(e.enumlabel, ',' order by e.enumlabel) as values)
      from
        pg_type t
      left join
        pg_enum e ON e.enumtypid = t.oid
      left join
        pg_catalog.pg_namespace n on n.oid = t.typnamespace
      left join
        pg_class on pg_class.oid = t.typrelid
      left join
        pg_attribute a on a.attrelid = pg_class.oid
      where   
        (
          t.typrelid = 0 
            or 
          (select c.relkind = '${'c'}' from pg_catalog.pg_class c where c.oid = t.typrelid)
        ) and     
        not exists(select 1 from pg_catalog.pg_type el where el.oid = t.typelem and el.typarray = t.oid) and     
        t.typinput = 'enum_in'::regproc and     
        t.typoutput = 'enum_out'::regproc and     
        n.nspname not in ('pg_catalog', 'information_schema')
      group by
        t.typname, n.nspname
      order by
        n.nspname, t.typname;`)
  }

  /**
   * Запрос на процедуры в базе данных
   */
  private async procedureQuery(): Promise<{ schema: string, routine: string, params: string, returns: string }[]> {
    return this.db.query(`select
        ns.nspname::text as schema,
        prc.proname::text as routine,
        pg_catalog.pg_get_function_arguments(prc.oid) as params,
        pg_catalog.pg_get_function_result(prc.oid) as returns
      from
        pg_proc prc
      inner join
        pg_namespace ns on (prc.pronamespace = ns.oid)
      where
        ns.nspname like '${'pkg_%'}' and
        ns.nspname != '${'pkg_migration'}' and
        prc.proname not like '${'trigger_%'}'
      order by
        ns.nspname, prc.proname;`)
  }

  /**
   * Запрос на типы в базе данных
   */
  private async typeQuery(): Promise<{ schema: string, name: string, type: { [key: string]: string } }[]> {
    return this.db.query(`select
        n.nspname as schema,
        t.typname as name,
        (select json_object_agg(a.attname, format_type(a.atttypid, a.atttypmod) order by a.attnum) as type)
      from
        pg_type t
      left join
        pg_catalog.pg_namespace n on n.oid = t.typnamespace
      left join
        pg_class on pg_class.oid = t.typrelid
      left join
        pg_attribute a on a.attrelid = pg_class.oid
      where   
        (
          t.typrelid = 0 
            or 
          (select c.relkind = '${'c'}' from pg_catalog.pg_class c where c.oid = t.typrelid)
        ) and     
        not exists(select 1 from pg_catalog.pg_type el where el.oid = t.typelem and el.typarray = t.oid) and
        t.typinput = 'record_in'::regproc and
        t.typoutput = 'record_out'::regproc and
        n.nspname not in ('pg_catalog', 'information_schema')
      group by
        t.typname, n.nspname
      order by
        n.nspname, t.typname;`)
  }
}

/**
 * Обновление файла в базе данных
 */
const updateFile = (filePath: string, newContent: string): string => {
  const exists = existsSync(filePath)

  let oldContent = ''

  if (exists) {
    try {
      oldContent = readFileSync(filePath, 'utf8')
    } catch (e) {
      if (e.code !== 'ENOENT') {
        throw e
      }
    }
  }

  if (oldContent !== newContent) {
    writeFileSync(filePath, newContent)

    return `${filePath} ${exists ? 'updated' : 'created'} successfully`
  }

  return `${filePath} is up to date`
}

/**
 * Создание схемы каталога в базе данных
 */
const createCatalogSchema = async (): Promise<string> => {
  const filePath = path.join(
    __dirname,
    '..',
    'schema.ts'
  )

  const options = dataSource.options as any

  console.log(`Connecting to ${options.host}:${options.port}/${options.database} as ${options.username}`)

  const db = await dataSource.initialize()

  console.log('Processing catalog schema')

  const fileContent = await new PostgresTypesConverter(db).getSchemaFileContent()

  await db.destroy()

  return updateFile(filePath, fileContent)
}

createCatalogSchema()
  .then(result => console.log(result))
  .catch(e => console.log(e))
