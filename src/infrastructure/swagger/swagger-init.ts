import { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { NodeEnv } from '@infrastructure/environment'
import { ISwaggerSection, SwaggerSectionEnum, swaggerSectionRegistry } from '@infrastructure/swagger'

/** 
 * Генерация ссылок
 */
function generateLinks(docs: any, currentPath: string) {
  const links: string[] = []

  for (const [ path, options ] of docs) {
    if (currentPath !== path) {
      links.push(`<a href="/${path}">${options.linkTitle}</a><br />`)
    }
  }

  return links.join('')
}

/** 
 * Инициализация Swagger
 */
export class SwaggerInit {
  /** 
   * Регистрация Swagger
   */
  public static async register(app: INestApplication) {
    if (process.env.NODE_ENV === NodeEnv.PRODUCTION) {
      return
    }

    const configService = app.get(ConfigService)

    const appName = configService.get<string>('APP_API_NAME') || configService.get<string>('APP_NAME') || 'Nest API'

    const sections = new Map<string, ISwaggerSection>([
      [
        'docs', {
          title: 'User API',
          linkTitle: 'User API',
          modules: swaggerSectionRegistry.getModules(SwaggerSectionEnum.API)
        }
      ],
      [
        `docs/${SwaggerSectionEnum.MANAGEMENT}`, {
          title: 'Management API',
          linkTitle: 'Management API',
          modules: swaggerSectionRegistry.getModules(SwaggerSectionEnum.MANAGEMENT)
        }
      ],
      [
        `docs/${SwaggerSectionEnum.HEALTH}`, {
          title: 'Health API',
          linkTitle: 'Health API',
          modules: swaggerSectionRegistry.getModules(SwaggerSectionEnum.HEALTH)
        }
      ]
    ])

    for (const [ path, options ] of sections) {
      const swaggerConfig = new DocumentBuilder()
        .setTitle(options.title)
        .setDescription(`${appName} reference<br /><br />${generateLinks(sections, path)}`)
        .setVersion('1.0.0')
        .addBearerAuth(
          {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          },
          'JWT'
        )
        .build()

      const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig, {
        deepScanRoutes: true,
        include: options.modules
      })

      // if (configService.get<string>('NODE_ENV') !== NodeEnv.PRODUCTION) {
      //   swaggerDocument
      //     .addServer(`http://localhost/api/n/${appName}/`)
      // }

      SwaggerModule.setup(path, app, swaggerDocument, {
        swaggerOptions: {
          tagsSorter: 'alpha',
          operationsSorter: 'alpha',
          defaultModelsExpandDepth: -1
        }
      })
    }
  }
}
