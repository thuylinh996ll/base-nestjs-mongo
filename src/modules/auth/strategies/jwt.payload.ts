import { UserRole } from 'src/shared/enum/users.const';

export class JwtPayload {
  userId: string;
  role: UserRole;
}
