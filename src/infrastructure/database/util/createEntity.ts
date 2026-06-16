/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { writeFileSync, existsSync } from 'node:fs'
import * as path from 'path'
import { DataSource } from 'typeorm'

import { dataSource } from '../typeorm.config'
import { PgTypeMap } from './constants'
import { enumBody, relationVarName, relationFileName, interfaceBody, entityBody } from './helper'
import { TColumn, TForeignKey, TEnum, TTable, TIndex } from './types'

/**
 * Парсер структуры базы данных
 */
class Parser {
  private db: DataSource

  private typeMap = PgTypeMap

  private constantsPath = path.join(__dirname, '../../../common/constants/')
  private interfacesPath = path.join(__dirname, '../../../common/interfaces/')
  private entityPath = path.join(__dirname, '../../../common/entity/')

  constructor(db: DataSource) {
    this.db = db
  }

  /**
   * Получение схемы в базе данных
   */
  async getSchema() {
    console.log('Processing enums\n\n')
    for (const item of await this.enumList()) {
      console.log(`${item.name}: ${item.varname} -> ${item.filename}`)
      saveContentToFile(this.constantsPath + item.filename, enumBody(item.varname, item.values), true)
    }

    console.log('\n\nProcessing interfaces\n\n')
    for (const table of (await this.tableList())) {
      table.columns = await this.columnList(table.table_schema, table.table_name)
      table.foreignKeys = await this.foreignKeyList(table.table_schema, table.table_name)
      table.indices = await this.indicesList(table.table_schema, table.table_name)
      console.log(`${table.table_name}: ${table.interfaceName} -> ${table.interfaceFilename}`)
      saveContentToFile(this.interfacesPath + table.interfaceFilename, interfaceBody(table.interfaceName, table.columns), true)
      console.log(`${table.table_name}: ${table.entityName} -> ${table.entityFilename}`)
      saveContentToFile(this.entityPath + table.entityFilename, entityBody(table), true)
    }

    return 'fine'
    // const tables = await this.listTables()
  }

  /**
   * Список перечислений в базе данных
   */
  private async enumList(): Promise<TEnum[]> {
    return (await this.db.query(`select
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
        not (t.typname ilike '%thing%') and             
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
        n.nspname, t.typname;`)).map(item => {
      return {
        schema: item.schema,
        name: item.name,
        values: item.values.split(','),
        varname: relationVarName(item.name, 'Enum'),
        filename: relationFileName(item.name, '.enum')
      }
    })
  }

  /**
   * Список таблиц в базе данных
   */
  private async tableList(table?: string): Promise<TTable[]> {
    return (await this.db.query(`select
      pgns.nspname as "table_schema",
      pgc.relname as "table_name",
      case pgc.relkind
        when 'r' then 'table'
        when 'v' then 'view'
        when 'i' then 'index'
        when 'S' then 'sequence'
        when 's' then 'special'
        when 'f' then 'foreign table'
      end as "type",
      pg_catalog.pg_get_userbyid(pgc.relowner) as "owner"
    from
      pg_catalog.pg_class pgc
    left join
      pg_catalog.pg_namespace pgns on
        pgns.oid = pgc.relnamespace
    where
      pgc.relkind in ('${'r'}', 'p','') and
      pgc.relispartition is false and
      pgns.nspname = 'public' and
      ${table ? 'pgc.relname = \'' + table + '\' and' : '' }
      not (pgc.relname ilike 'adonis%') and
      not (pgc.relname ilike 'typeorm%') and
      not (pgc.relname ilike '%thing%') and
      pg_catalog.pg_table_is_visible(pgc.oid)
    order by
      "table_name"`)).map(item => {
      return {
        table_schema: item.table_schema,
        table_name: item.table_name,
        interfaceName: `I${relationVarName(item.table_name.replace('recomendation', 'recommendation'), '')}`,
        interfaceFilename: relationFileName(item.table_name.replace('recomendation', 'recommendation'), ''),
        entityName: `${relationVarName(item.table_name.replace('recomendation', 'recommendation'), '')}Entity`,
        entityFilename: relationFileName(item.table_name.replace('recomendation', 'recommendation'), '.entity')
      }
    })
  }

  /**
   * Список столбцов в таблице в базе данных
   */
  private async columnList(schema: string, table: string): Promise<TColumn[]> {
    return this.db.query(`
      select
        ccu.constraint_name as primary_key_name,
        isc.column_name,
        isc.data_type,
        isc.column_default,
        (isc.is_nullable = 'YES') as is_nullable,
        isc.character_maximum_length,
        isc.numeric_precision,
        isc.numeric_precision_radix,
        isc.numeric_scale,
        isc.is_generated as generated_type,
        (isc.is_generated = 'ALWAYS') as is_generated,
        isc.generation_expression,
        isc.udt_schema,
        isc.udt_name
      from
        information_schema.columns isc
      left join
        information_schema.table_constraints tc on
          tc.table_name = isc.table_name and
          tc.table_schema = isc.table_schema and
          lower(tc.constraint_type) = 'primary key'
      left join
        information_schema.constraint_column_usage ccu on
          ccu.table_name = isc.table_name  and
          ccu.table_schema = isc.table_schema and
          ccu.constraint_name = tc.constraint_name and
          ccu.column_name = isc.column_name
      where
          isc.table_schema = '${schema}' and
          isc.table_name = '${table}'
      order by
        ordinal_position`)
  }

  /**
   * Список внешних ключей в таблице в базе данных
   */
  private async foreignKeyList(schema: string, table: string): Promise<TForeignKey[]> {
    return this.db.query(`
      select
        tc.table_schema,
        tc.table_name,
        tc.constraint_name,
        kcu.column_name,
        ccu.table_schema as foreign_table_schema,
        ccu.table_name as foreign_table_name,
        ccu.column_name as foreign_column_name,
        case
          pgcnst.confupdtype
            when 'r' then 'RESTRICT'
            when 'c' then 'CASCADE'
            when 'n' then 'SET NULL'
            when 'd' then 'DEFAULT'
            when 'a' then 'NO ACTION'
        end as on_update,
        case
          pgcnst.confdeltype
            when 'r' then 'RESTRICT'
            when 'c' then 'CASCADE'
            when 'n' then 'SET NULL'
            when 'd' then 'DEFAULT'
            when 'a' then 'NO ACTION'
        end as on_delete
      from
        pg_class pgc
      join
        pg_namespace nsp on nsp.oid = pgc.relnamespace
      join
        information_schema.table_constraints as tc on
          tc.table_schema = nsp.nspname and
          tc.table_name = pgc.relname
      join
        information_schema.key_column_usage as kcu on
          tc.constraint_name = kcu.constraint_name and
          tc.table_schema = kcu.table_schema
      join
        information_schema.constraint_column_usage as ccu on
          ccu.constraint_name = tc.constraint_name
      join
        pg_constraint pgcnst on pgcnst.conname = tc.constraint_name
      where
        pgc.relispartition is false and
        lower(tc.constraint_type) = 'foreign key' and
        tc.table_schema='${schema}' and
        tc.table_name = '${table}'`)
  }

  /**
   * Список индексов в таблице в базе данных
   */
  private async indicesList(schema: string, table: string): Promise<TIndex[]> {
    return (await this.db.query(`
      select
        idx.indrelid::regclass as table_name,
        pgc.relname as index_name,
        am.amname as index_type,
        (
          select
            string_agg(pg_get_indexdef(idx.indexrelid, k + 1, true), ',' order by k)
          from
            generate_subscripts(idx.indkey, 1) as k
        ) as index_columns,
        coalesce(lower(tc.constraint_type) = 'unique', false) as "is_unique",
        coalesce(lower(tc.constraint_type) = 'primary key', false) as "is_primary",
        coalesce(am.amname = 'gin', false) as "is_fulltext",
        tc.constraint_type is null as "is_index"
      from
        pg_index as idx
      join
        pg_class as pgc on pgc.oid = idx.indexrelid
      join
        pg_am as am on pgc.relam = am.oid
      left join
        information_schema.table_constraints tc on
          tc.constraint_name = pgc.relname
      where
        idx.indrelid::regclass = '${table}'::regclass`))
      .map(item => {
        return {
          table_name: item.table_name,
          index_name: item.index_name,
          index_type: item.index_type,
          index_columns: item.index_columns.split(','),
          is_unique: item.is_unique,
          is_fulltext: item.is_fulltext,
          is_primary: item.is_primary,
          is_index: item.is_index
        }
      })
  }
}

/**
 * Сохранение контента в файл в базе данных
 */
const saveContentToFile = (filePath: string, content: string, overwrite = false): any => {
  const exists = existsSync(filePath)

  if (exists && !overwrite) {
    return
  }

  writeFileSync(filePath, content)
}

// const updateFile = (filePath: string, newContent: string): string => {
//   const exists = existsSync(filePath)
//
//   let oldContent = ''
//
//   if (exists) {
//     try {
//       oldContent = readFileSync(filePath, 'utf8')
//     } catch (e) {
//       if (e.code !== 'ENOENT') {
//         throw e
//       }
//     }
//   }
//
//   if (oldContent !== newContent) {
//     writeFileSync(filePath, newContent)
//
//     return `${filePath} ${exists ? 'updated' : 'created'} successfully`
//   }
//
//   return `${filePath} is up to date`
// }

const createEntity = async (): Promise<string> => {
  // const filePath = path.join(
  //   __dirname,
  //   '..',
  //   'schema.ts'
  // )

  const options: any = dataSource.options

  console.log(`Connecting to ${options.host}:${options.port}/${options.database} as ${options.username}`)

  const db = await dataSource.initialize()

  console.log('Processing catalog')

  const parser = await new Parser(db)

  await parser.getSchema()

  // const fileContent = await new PostgresTypesConverter(db).getSchemaFileContent()

  await db.destroy()

  return 'ok'

  // return updateFile(filePath, fileContent)
}

createEntity()
  .then(result => console.log(result))
  .catch(e => console.log(e))
