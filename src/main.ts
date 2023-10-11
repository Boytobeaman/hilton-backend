import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as winston from 'winston';
import { utilities, WinstonModule } from 'nest-winston';
import 'winston-daily-rotate-file';
import * as morgan from 'morgan';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './filters/http.exception.filter';
import { MongoExceptionFilter } from './filters/mongo.exception.filter';

async function bootstrap() {
  const instance = winston.createLogger({
    transports: [
      new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
          winston.format.timestamp(),
          utilities.format.nestLike(),
        ),
      }),
      new winston.transports.DailyRotateFile({
        dirname: 'logs',
        level: 'info',
        filename: 'application-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.simple(),
        ),
      }),
    ],
  });
  const logger = WinstonModule.createLogger({
    instance,
  });

  const app: NestExpressApplication = await NestFactory.create(AppModule, {
    logger,
  });

  // Log request/responses
  app.use(
    morgan('short', {
      stream: {
        write: (message) => {
          // logger.log(message);
          logger.log(message.trim());
        },
      },
    }),
  );

  // need app: NestExpressApplication to use app.set
  app.set('trust proxy', true);

  app.useGlobalFilters(new HttpExceptionFilter(logger));
  app.useGlobalFilters(new MongoExceptionFilter(logger));

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const port = process.env.PORT;
  instance.info(`Application started at port ${port}`);
  await app.listen(port);
}
bootstrap();
