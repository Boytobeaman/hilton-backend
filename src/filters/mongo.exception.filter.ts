import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  LoggerService,
} from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = HttpStatus.SERVICE_UNAVAILABLE;
    this.logger.error(exception.message, exception.stack);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: exception.message || exception.name,
      error: exception.name,
    });
  }
}
