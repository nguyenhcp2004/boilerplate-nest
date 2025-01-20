import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { BadRequestException, ValidationPipe } from '@nestjs/common'
import { ValidationError } from 'class-validator'
import { AllHttpExceptionFilter } from '@exceptions/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new AllHttpExceptionFilter())
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(
          validationErrors.map((error) => ({
            [error.property]: Object.values(error.constraints)[0]
          }))
        )
      }
    })
  )
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
