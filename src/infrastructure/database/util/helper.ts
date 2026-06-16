import { PgTypeMap } from '@infrastructure/database/util/constants'
import { TColumn, TTable } from '@infrastructure/database/util/types'
import { caseSnakeToCamel } from '@common/util'

/**
 * Транслитерация строки
 */
export const transliterate = str =>
  str
    .replace(/\u0401/g, 'YO')
    .replace(/\u0419/g, 'I')
    .replace(/\u0426/g, 'TS')
    .replace(/\u0423/g, 'U')
    .replace(/\u041A/g, 'K')
    .replace(/\u0415/g, 'E')
    .replace(/\u041D/g, 'N')
    .replace(/\u0413/g, 'G')
    .replace(/\u0428/g, 'SH')
    .replace(/\u0429/g, 'SCH')
    .replace(/\u0417/g, 'Z')
    .replace(/\u0425/g, 'H')
    .replace(/\u042A/g, '')
    .replace(/\u0451/g, 'yo')
    .replace(/\u0439/g, 'i')
    .replace(/\u0446/g, 'ts')
    .replace(/\u0443/g, 'u')
    .replace(/\u043A/g, 'k')
    .replace(/\u0435/g, 'e')
    .replace(/\u043D/g, 'n')
    .replace(/\u0433/g, 'g')
    .replace(/\u0448/g, 'sh')
    .replace(/\u0449/g, 'sch')
    .replace(/\u0437/g, 'z')
    .replace(/\u0445/g, 'h')
    .replace(/\u044A/g, '')
    .replace(/\u0424/g, 'F')
    .replace(/\u042B/g, 'I')
    .replace(/\u0412/g, 'V')
    .replace(/\u0410/g, 'A')
    .replace(/\u041F/g, 'P')
    .replace(/\u0420/g, 'R')
    .replace(/\u041E/g, 'O')
    .replace(/\u041B/g, 'L')
    .replace(/\u0414/g, 'D')
    .replace(/\u0416/g, 'ZH')
    .replace(/\u042D/g, 'E')
    .replace(/\u0444/g, 'f')
    .replace(/\u044B/g, 'i')
    .replace(/\u0432/g, 'v')
    .replace(/\u0430/g, 'a')
    .replace(/\u043F/g, 'p')
    .replace(/\u0440/g, 'r')
    .replace(/\u043E/g, 'o')
    .replace(/\u043B/g, 'l')
    .replace(/\u0434/g, 'd')
    .replace(/\u0436/g, 'zh')
    .replace(/\u044D/g, 'e')
    .replace(/\u042F/g, 'YA')
    .replace(/\u0427/g, 'CH')
    .replace(/\u0421/g, 'S')
    .replace(/\u041C/g, 'M')
    .replace(/\u0418/g, 'I')
    .replace(/\u0422/g, 'T')
    .replace(/\u042C/g, '')
    .replace(/\u0411/g, 'B')
    .replace(/\u042E/g, 'YU')
    .replace(/\u044F/g, 'ya')
    .replace(/\u0447/g, 'ch')
    .replace(/\u0441/g, 's')
    .replace(/\u043C/g, 'm')
    .replace(/\u0438/g, 'i')
    .replace(/\u0442/g, 't')
    .replace(/\u044C/g, '')
    .replace(/\u0431/g, 'b')
    .replace(/\u044E/g, 'yu')

/**
 * Тело enum в базе данных
 */
export const enumBody = (name: string, values: string[]) => {
  let result = `export enum ${name} {\n`
  for (let i = 0; i < values.length; i++) {
    result = result + `  ${transliterate(values[i].replace(' ', '_').toUpperCase())} = '${values[i]}'${i !== values.length - 1 ? ',' : ''}\n`
  }

  return `${result}}\n`
}

/**
 * Название переменной отношения в базе данных
 */
export const relationVarName = (str: string, suffix: string) =>
  str
    .toLowerCase()
    .replace('cities', 'city')
    .replace('auditories', 'auditory')
    .replace('branches', 'branch')
    .replace('addresses', 'address')
    .replace('statuses', 'status')
    .replace('constituencies', 'constituency')
    .replace('histories', 'history')
    .replace('recomendation', 'recommendation')
    .split('_')
    .filter(s => s !== 'enum')
    .map(s => ![ 'status', 'news', 'address', 'settings' ].includes(s) ? s.replace(/s$/, '') : s)
    .map(s => s[0].toUpperCase() + s.slice(1))
    .join('') + suffix

/**
 * Название файла отношения в базе данных
 */
export const relationFileName = (str: string, suffix: string) =>
  str
    .toLowerCase()
    .replace('cities', 'city')
    .replace('auditories', 'auditory')
    .replace('branches', 'branch')
    .replace('addresses', 'address')
    .replace('statuses', 'status')
    .replace('constituencies', 'constituency')
    .replace('histories', 'history')
    .split('_')
    .filter(s => s !== 'enum')
    .map(s => ![ 'status', 'news', 'address', 'settings' ].includes(s) ? s.replace(/s$/, '') : s)
    .join('-') + suffix + '.ts'

/**
 * Тело интерфейса в базе данных
 */
export const interfaceBody = (name: string, columns: TColumn[]) => {
  const columnNames = columns.map(c => c.column_name)

  const base = columnNames.includes('created_at') && columnNames.includes('updated_at')

  let result = ''

  const enums = []

  result = result + `export interface ${name}${base ? ' extends IEntityBase' : ''} {\n`

  for (const column of columns) {
    if (base && [ 'created_at', 'updated_at' ].includes(column.column_name)) {
      continue
    }

    let data_type

    if (column.data_type === 'USER-DEFINED') {
      data_type = relationVarName(column.udt_name, 'Enum')
      enums.push(data_type)
    } else {
      data_type = PgTypeMap[column.data_type]
    }

    result = result + `  ${column.column_name}${column.is_nullable ? '?' : ''}: ${data_type}\n`
  }

  if (enums.length) {
    result = `import { ${enums.join(', ')} } from '@platforma-backend/avtomat-common/constants'\n\n` + result
  }

  if (base) {
    result = 'import { IEntityBase } from \'@common/interfaces\'\n' + (!enums.length ? '\n' : '') + result
  }

  return `${result}}\n`
}

/**
 * Заполнение параметров в базе данных
 */
const fillParams = (params: { [key: string]: any }, pad: number = 4) => {
  let result = ''

  const keys = Object.keys(params)

  for (let i = 0; i < keys.length; i++) {
    result = result + `${' '.repeat(pad)}${keys[i]}: ${params[keys[i]]}${i < keys.length - 1 ? ',' : ''}\n`
  }

  return result
}

/**
 * Тело сущности в базе данных
 */
export const entityBody = (table: TTable) => {
  const typeOrmDecorators = [ 'Entity', 'PrimaryColumn', 'Column' ]

  const primaryColumn = table.columns.find(col => col.primary_key_name)

  const interfaceName = `I${relationVarName(table.table_name, '')}`

  const tableConstName = `${table.table_name.replace('recomendation', 'recommendation').toUpperCase()}_TABLE_NAME`

  const entityName = `${relationVarName(table.table_name, '')}Entity`

  const columnNames = table.columns.map(c => c.column_name)

  const entities = []

  const base = columnNames.includes('created_at') && columnNames.includes('updated_at')

  if (base) {
    entities.push('BaseEntity')
  }

  const enums = []

  const indices = table.indices.filter(item => item.is_index || item.is_unique)

  if (indices.length) {
    typeOrmDecorators.push('Index')
  }

  let result = `@Entity(${tableConstName})\n`

  for (const index of indices) {
    let options = ''

    if (index.is_unique) {
      options = ', { unique: true }'
    } else if (index.is_fulltext) {
      // options = ', { fulltext: true }'
      options = ', { synchronize: false }'
    }

    index.index_columns = index.index_columns.map(column => column.replace(/"/g, ''))

    index.index_name = index.index_name.replace(/"/g, '')

    const indexName = index.index_name.replace(table.table_name, '${' + tableConstName + '}')

    if (index.is_fulltext) {
      result = result + '@Index(' + (indexName !== index.index_name ? '`' : '\'') + indexName + (indexName !== index.index_name ? '`' : '\'') + '' + options + ')\n'
    } else {
      result = result + '@Index(' + (indexName !== index.index_name ? '`' : '\'') + indexName + (indexName !== index.index_name ? '`' : '\'') + ', [ \'' + index.index_columns.join('\', \'') + '\' ]' + options + ')\n'
    }
  }

  result = result + `export class ${entityName}${base ? ' extends BaseEntity' : ''} implements ${interfaceName} {\n`

  if (!primaryColumn && !columnNames.includes('id')) {
    result = result +
      '  @PrimaryColumn(\'integer\', {\n' +
      '    generated: true,\n' +
      '    primaryKeyConstraintName: `${' + tableConstName + '}_pkey`,\n' +
      '    nullable: false\n' +
      '  })\n' +
      '    id: number\n\n'
  }

  const columns =
    table.columns.filter(column => !base || !(base && [ 'created_at', 'updated_at' ].includes(column.column_name)))

  for (let i = 0; i < columns.length; i++) {
    const column = columns[i]

    column.column_name = column.column_name.replace(/"/g, '')

    const params: { [key: string]: any } = {}

    switch (column.data_type) {
      case 'USER-DEFINED': {
        const enumName = relationVarName(column.udt_name, 'Enum')
        enums.push(enumName)

        params.enum = enumName
        params.enumName = `'${column.udt_name}'`

        if (column.column_default) {
          params.default = `${relationVarName(column.udt_name, 'Enum')}.${column.column_default.replace(/'/g, '').replace('::' + column.udt_name, '')
            .toUpperCase()}`
        }

        params.nullable = `${column.is_nullable ? 'true' : 'false'}`

        result = result +
          '  @Column(\'enum\', {\n' +
          fillParams(params, 4) +
          '  })\n' +
          `    ${column.column_name}${column.is_nullable ? '?' : ''}: ${enumName}`

        break
      }
      case 'character varying': {
        if (column.is_generated && column.generation_expression) {
          params.type = `'${column.data_type}'`
          params.generatedType = '\'STORED\''
          params.asExpression = `'${column.generation_expression?.replace(/'/g, '\\\'')}'`
        }

        if (column.column_default) {
          const value = column.column_default.replace('::' + column.data_type, '').replace(/'/g, '')

          params.default = `'${value}'`

          if (value.toLowerCase() === 'null') {
            params.default = 'null'
          }
        }

        if (column.character_maximum_length) {
          params.length = column.character_maximum_length
        }

        params.nullable = `${column.is_nullable ? 'true' : 'false'}`

        if (column.is_generated) {
          result = result +
            '  @Column({\n'
        } else {
          result = result +
            `  @Column('${column.data_type}', {\n`
        }

        result = result +
          fillParams(params, 4) +
          '  })\n' +
          `    ${column.column_name}${column.is_nullable ? '?' : ''}: ${PgTypeMap[column.data_type]}`

        break
      }
      case 'tsvector': {
        if (column.generation_expression) {
          params.type = `'${column.data_type}'`
          params.generatedType = '\'STORED\''
          params.asExpression = `'${column.generation_expression?.replace(/'/g, '\\\'')}'`
        }
        params.select = 'false'
        params.nullable = column.is_nullable.toString()

        if (column.is_generated) {
          result = result +
            '  @Column({\n'
        } else {
          result = result +
            `  @Column('${column.data_type}', {\n`
        }

        result = result +
          fillParams(params, 4) +
          '  })\n' +
          `    ${column.column_name}${column.is_nullable ? '?' : ''}: ${PgTypeMap[column.data_type]}`
        break
      }
      default: {
        if (column.primary_key_name && column.data_type === 'integer' && column.column_default) {
          params.generated = 'true'
        } else if (column.primary_key_name) {
          params.generated = 'false'
        }

        if (column.data_type === 'numeric') {
          if (column.numeric_precision) {
            params.precision = column.numeric_precision
          }
          if (column.numeric_scale) {
            params.scale = column.numeric_scale
          }
        }

        if (column.column_default && !column.primary_key_name) {
          const defaultValue = column.column_default.replace(/'/g, '').replace('::' + column.data_type, '')

          // eslint-disable-next-line sonarjs/no-nested-switch
          switch (column.data_type) {
            case 'boolean': {
              params.default = defaultValue === 'true'
              break
            }
            case 'numeric':
            case 'smallint':
            case 'real':
            case 'integer': {
              params.default = Number(defaultValue)
              break
            }
            case 'json':
            case 'jsonb': {
              params.default = JsonToJS(defaultValue)
              break
            }
            case 'timestamp with time zone':
            case 'timestamp without time zone': {
              params.default = defaultValue.toLowerCase() === 'now()' ? '() => \'now()\'' : defaultValue
              break
            }
            default: {
              params.default = `'${defaultValue}'`
            }
          }
        }

        if (column.primary_key_name) {
          params.primaryKeyConstraintName = '`' + column.primary_key_name.replace(table.table_name, '${' + tableConstName + '}') + '`'
        }

        params.nullable = `${column.is_nullable ? 'true' : 'false'}`

        result = result +
          `  @${ column.primary_key_name ? 'Primary' : '' }Column('${column.data_type}', {\n` +
          fillParams(params, 4) +
          '  })\n' +
          `    ${column.column_name}${column.is_nullable ? '?' : ''}: ${PgTypeMap[column.data_type]}`

        const foreignKey = table.foreignKeys.find(item => item.column_name === column.column_name)

        if (foreignKey) {
          if (!typeOrmDecorators.includes('ManyToOne')) {
            typeOrmDecorators.push('ManyToOne')
          }

          if (!typeOrmDecorators.includes('JoinColumn')) {
            typeOrmDecorators.push('JoinColumn')
          }

          let fkVarname = caseSnakeToCamel(column.column_name.replace('_id', ''))

          if (columnNames.includes(fkVarname)) {
            fkVarname = caseSnakeToCamel(table.table_name + '_' + column.column_name.replace('_id', ''))
          }

          const fkEntityName = `${relationVarName(foreignKey.foreign_table_name, '')}Entity`

          if (!entities.includes(fkEntityName) && fkEntityName !== entityName) {
            entities.push(fkEntityName)
          }

          const foreignKeyConstraintMame = foreignKey.constraint_name.replace(table.table_name, '${' + tableConstName + '}').replace(table.table_name, '${' + tableConstName + '}')

          result = result +
            '\n\n  @ManyToOne(\n' +
            `    () => ${fkEntityName},\n` +
            '    entity => entity.id,\n' +
            '    {\n' +
            `      nullable: ${column.is_nullable ? 'true' : 'false'},\n` +
            `      onUpdate: '${foreignKey.on_update}',\n` +
            `      onDelete: '${foreignKey.on_delete}'\n` +
            '    }\n' +
            '  )\n' +
            '  @JoinColumn({\n' +
            `    name: '${column.column_name}',\n` +
            `    referencedColumnName: '${foreignKey.foreign_column_name}',\n` +
            '    foreignKeyConstraintName: ' + (foreignKeyConstraintMame !== foreignKey.constraint_name ? '`' : '\'') + foreignKeyConstraintMame + (foreignKeyConstraintMame !== foreignKey.constraint_name ? '`' : '\'') + '\n' +
            '  })\n' +
            `    ${fkVarname}?: ${fkEntityName}`
        }
      }
    }

    result = result + '\n' + (i < columns.length - 1 ? '\n' : '')
  }

  result = `${result}}\n`

  result = `\nconst ${tableConstName} = '${table.table_name}'\n\n${result}`

  if (entities.length) {
    result = `import { ${entities.join(', ')} } from '@platforma-backend/avtomat-common/entity'\n${result}`
  }

  if (enums.length) {
    result = `import { ${enums.join(', ')} } from '@platforma-backend/avtomat-common/constants'\n${result}`
  }

  result = `import { ${table.interfaceName} } from '@platforma-backend/avtomat-common/interfaces'\n${result}`
  result = `import {\n  ${typeOrmDecorators.join(',\n  ')}\n} from 'typeorm'\n${result}`

  return result
}

/**
* Преобразование JSON в JS в базе данных
 */
const JsonToJS = input => {
  if (input === '[]' || input === '{}') {
    return input
  }

  try {
    return JSON.stringify(JSON.parse(input), null, 2)
      .split('\n')
      .map((line, i) => {
        let s =
          line
            .replace(/"(.+?)":/g, '$1:')
            .replace(/"/g, '\'')
        if (i !== 0) {
          s = `${' '.repeat(4)}${s}`
        }

        return s
      })
      .join('\n')
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)

    return null
  }
}

