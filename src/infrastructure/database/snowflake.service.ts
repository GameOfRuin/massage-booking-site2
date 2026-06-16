import { Injectable } from '@nestjs/common'
import { DatabaseService, SNOWFLAKE_ID_EPOCH } from '@infrastructure/database'
import { Snowflake } from 'nodejs-snowflake'

@Injectable()
export class SnowflakeService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getSnowflakeId<T>(tableName: string): Promise<T> {
    return (
      await this.databaseService.call(
        'pkg_snowflake',
        'snowflake_id_from_timestamp',
        { p_sequence_pattern: tableName }
      )
    ) as T
  }

  getSnowflakeData(snowflakeId: bigint): {snowflakeId: bigint, instanceId: number, timestamp: number, date: Date} {
    const timestamp = Snowflake.timestampFromID(snowflakeId, SNOWFLAKE_ID_EPOCH)

    return {
      snowflakeId,
      instanceId: Snowflake.instanceIDFromID(snowflakeId),
      timestamp,
      date: new Date(timestamp)
    }
  }
}
