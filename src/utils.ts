import { INestApplication, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

/**
 * Function that creates a `Nest` application.
 *
 * @returns an object that represents the application.
 */
export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule)

  setupPipes(app)
  app.enableCors()

  return app
}

/**
 * Function that set the global pipes to the application
 *
 * @param app stores the application instance
 */
function setupPipes(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )
}
