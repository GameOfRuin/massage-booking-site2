/** Маппинг типов PostgreSQL */
export const PgTypeMap = {
  /** String */
  nchar: 'string',
  /** Nvarchar */
  nvarchar: 'string',
  /** Varchar */
  varchar: 'string',
  /** Char */
  char: 'string',
  /** Tinytext */
  tinytext: 'string',
  /** Longtext */
  longtext: 'string',
  /** Mediumtext */
  mediumtext: 'string',
  /** Text */
  text: 'string',
  /** Varbinary */
  varbinary: 'string',
  /** Uuid */
  uuid: 'string',
  /** Uniqueidentifier */
  uniqueidentifier: 'string',
  /** Character varying */
  'character varying': 'string',
  /** Xml */
  xml: 'string',
  /** Tsvector */
  tsvector: 'string',

  /** Bigint */
  bigint: 'string',
  /** Tinyint */
  tinyint: 'number',
  /** Int */
  int: 'number',
  /** Numeric */
  numeric: 'number',
  /** Integer */
  integer: 'number',
  /** Real */
  real: 'number',
  /** Smallint */
  smallint: 'number',
  /** Decimal */
  decimal: 'number',
  /** Float */
  float: 'number',
  'double precision': 'number',
  /** Double */
  double: 'number',
  /** Dec */
  dec: 'number',
  /** Fixed */
  fixed: 'number',
  /** Year */
  year: 'number',
  /** Serial */
  serial: 'number',
  /** Bigserial */
  bigserial: 'number',
  /** Int4 */
  int4: 'number',
  /** Money */
  money: 'number',
  /** Smallmoney */
  smallmoney: 'number',

  /** Datetime */
  datetime: 'Date',
  /** Timestamp */
  timestamp: 'Date',
  /** Date */
  date: 'Date',
  /** Time */
  time: 'Date',
  /** Datetime2 */
  datetime2: 'Date',
  /** Smalldatetime */
  smalldatetime: 'Date',
  /** Datetimeoffset */
  datetimeoffset: 'Date',
  'timestamp without time zone': 'Date',
  'timestamp with time zone': 'Date',

  /** Bit */
  bit: 'boolean',
  /** Boolean */
  boolean: 'boolean',
  /** Bool */
  bool: 'boolean',

  /** Json */
  json: '{ [key: string]: any }',
  /** Jsonb */
  jsonb: '{ [key: string]: any }',

  /** Void */
  void: 'void'
}
