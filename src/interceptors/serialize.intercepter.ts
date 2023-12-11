// todo i will create interceptor for serialize and we can put decorator inside there

import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import {  plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDto } from 'src/user/dto/user.dto';

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
   
    const dto = this.dto
    return next.handle().pipe(
      map((data: any) => {
      return  plainToInstance(dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
