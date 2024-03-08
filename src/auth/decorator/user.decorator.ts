import { ConflictException, createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    
    // console.log('user: ' + JSON.stringify(request.user));

    try {
      if (data == 'id' || data == 'email' || data == 'role') {
        if (request.user[data])
          return request.user[data];
        throw new ConflictException(`user-> ${data} not attached after authentication`);
      }
      return request.user;
    }
    catch {
      throw new ConflictException('user id not attached after authentication');
    }
  },
);