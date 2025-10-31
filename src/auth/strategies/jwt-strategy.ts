import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/auth/auth.service';
import { AuthJWTPayload } from 'src/auth/types/auth-jwt-payload';
import { JwtUser } from 'src/auth/types/jwt-user';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  async validate(payload: AuthJWTPayload): Promise<JwtUser> {
    const { userId } = payload.sub;

    const { id, role } = await this.userService.findUserById(userId);

    return { userId: id, role };
  }
}
