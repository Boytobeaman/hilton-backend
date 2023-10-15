import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  LoggerService,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    this.logger.error(exception.message, exception.stack);
    const resdata = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: exception.message || exception.name,
      error: exception.name,
    };

    // if called by graphql, no response.status available
    if (response.status) {
      response.status(status).json(resdata);
    }
  }
}
