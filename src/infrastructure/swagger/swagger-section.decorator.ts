/* eslint-disable @typescript-eslint/ban-types */
import { SwaggerSectionEnum } from '@infrastructure/swagger'

/** 
 * Регистрация секции Swagger
 */
class SwaggerSectionRegistry {
  private registry: { [key in string]: Set<Function> } = {}

  /** 
   * Регистрация секции Swagger
   */
  async register(section: SwaggerSectionEnum, className: Function): Promise<void> {
    if (!this.registry[section]) {
      this.registry[section] = new Set([ className ])
    } else {
      this.registry[section].add(className)
    }
  }

  /** 
   * Получение модулей секции Swagger
   */
  getModules(section: SwaggerSectionEnum): Function[] {
    if (this.registry[section]) {
      return [ ...this.registry[section] ]
    } else {
      return []
    }
  }
}

/** Регистрация секции Swagger */
export const swaggerSectionRegistry = new SwaggerSectionRegistry()

/** 
 * Декоратор секции Swagger
 */
export const SwaggerSection = (section: SwaggerSectionEnum | SwaggerSectionEnum[]) => {
  return function(className: Function) {
    if (Array.isArray(section)) {
      for (const s of section) {
        swaggerSectionRegistry.register(s, className)
      }
    } else {
      swaggerSectionRegistry.register(section, className)
    }
  }
}
