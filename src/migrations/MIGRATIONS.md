# Миграции

Документация [TypeORM](https://typeorm.io/migrations)

Автосинхронизация Entity в конфигурации отключена, 
работа с базой осуществляется строго через миграции.

### Конфигурация

`/src/infrastructure/database/typeorm.config.ts`

### Директория миграций

`/src/migrations`

### Команды

`npm run migration:create --name=SomeMigration`

Создать пустую миграцию с именем SomeMigration

`npm run migration:generate --name=SomeMigration`

Сгенерировать миграцию на основе Entity с именем SomeMigration

Генератор весьма странный, например не умеет работать с дефолтными значениями в виде функций, 
"дропает" в миграции автосгенерированные констрейты , индексы и прочее - надо
смотреть вручную, форматировать под линтер и вычищать лишнее.

`npm run migration:run`

Выполнить миграции. Имя миграция {TIMESTAMP}-name.ts, порядок выполнения
по времени создания миграции.

`npm run migration:revert`

Отменить последнюю произведённую миграцию

`npm run migration:schema`

Сгенерировать описание схемы каталога для вызовов DatabaseService
