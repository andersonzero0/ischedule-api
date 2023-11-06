import { Controller, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthSignInGuard } from './auth.signin.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthSignInGuard)
  @Post('company/signin')
  @UsePipes(new ValidationPipe())
  async signInCompany(@Request() req: any) {
    try {
      return await this.authService.signInCompany(req.user_uid)
    } catch (error) {
      return error
    }
  }
}
