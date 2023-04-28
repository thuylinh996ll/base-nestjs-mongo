import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtPayload } from '../strategies/jwt.payload';
import jwtDecode from 'jwt-decode';
import { Errors } from 'src/errors/errors';
import { ErrorCode } from 'src/errors/errors.interface';
import { UserRole } from 'src/shared/enum/users.const';

@Injectable()
export class OnlyAdmin implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    const payload: JwtPayload = jwtDecode(token);
    const { role } = payload;
    if (role === UserRole.ADMIN) return true;
    else throw new BadRequestException(Errors[ErrorCode.GENERAL_FORBIDEN]);
  }
}

@Injectable()
export class OnlySuperAdmin implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    const payload: JwtPayload = jwtDecode(token);
    const { role } = payload;
    if (role === UserRole.SUPER_ADMIN) return true;
    else throw new BadRequestException(Errors[ErrorCode.GENERAL_FORBIDEN]);
  }
}

@Injectable()
export class AdminAndSuperAdmin implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    const payload: JwtPayload = jwtDecode(token);
    const { role } = payload;
    if (role === UserRole.ADMIN || role === UserRole.SUPER_ADMIN) return true;
    else throw new BadRequestException(Errors[ErrorCode.GENERAL_FORBIDEN]);
  }
}