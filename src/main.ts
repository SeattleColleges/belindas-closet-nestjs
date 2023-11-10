import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { instance } from 'logger/winston.logger';

// comment testing out CI pr-workflow
// making a new commit with an open pr
// new comment after updating CI pr-workflow.yml file

// here is a comment as directed in the testing for PR #43 - Courtney


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: instance,
      handleExceptions: true
    })
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(/*{
    // TODO: set env variable here
      origin: 'http://localhost:3001', // the frontend (next.js) server
  }*/);
  await app.listen(3000);
}
bootstrap();
