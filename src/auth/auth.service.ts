import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signInCompany(id: string) {
    try {
      const user = await this.userService.findCompanyById(id);

      if(user == null) {
        throw new NotFoundException()
      }

      const payload = {
        uid: user.id,
        email: user.email
      }

      return {
        access_token: await this.jwtService.signAsync(payload)
      }
    } catch (error) {
      return error
    }
  }
}
