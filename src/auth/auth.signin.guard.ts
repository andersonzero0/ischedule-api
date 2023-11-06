import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthSignInGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private firebaseService: FirebaseService,
  ) {
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const decodedToken = await this.firebaseService.verifToken(token);

      const user = this.userService.findCompanyById(decodedToken.uid);

      if (user == null) {
        await this.firebaseService.deleteUser(decodedToken.uid);
        throw new UnauthorizedException();
      }

      request['user_uid'] = decodedToken.uid;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}