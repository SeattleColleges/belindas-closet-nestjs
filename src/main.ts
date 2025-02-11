import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { instance } from 'logger/winston.logger';

// comment testing out CI pr-workflow
// making a new commit with an open pr
// new comment after updating CI pr-workflow.yml file


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: instance,
      handleExceptions: true
    })
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:3000',
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
