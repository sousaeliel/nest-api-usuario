import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NestResponse } from './nest-response';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';

@Injectable()
export class NestTransformResponseInterceptor implements NestInterceptor {
  private httpAdapter: AbstractHttpAdapter;

  constructor(httpAdapterHost: HttpAdapterHost) {
    this.httpAdapter = httpAdapterHost.httpAdapter;
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((response: NestResponse) => {
        if (!(response instanceof NestResponse)) {
          return response;
        }

        const httpContext = context.switchToHttp();
        const httpResponse = httpContext.getResponse();
        const { status, headers, body } = response;
        const headersNames = Object.getOwnPropertyNames(headers);

        this.httpAdapter.status(httpResponse, status);

        headersNames.forEach((headerName) => {
          const headervalue = headers[headerName];
          this.httpAdapter.setHeader(httpResponse, headerName, headervalue);
        });

        return body;
      }),
    );
  }
}
