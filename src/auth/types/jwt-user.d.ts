import { Role } from 'src/enum/role.enum';

export type JwtUser = {
  userId: number;
  role: Role;

};
