import { Controller, Get, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthSignInGuard } from './auth.signin.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthSignInGuard)
  @UsePipes(new ValidationPipe())
  @Get('company/signin')
  async signInCompany(@Request() req: any) {
    console.log(req.user_uid)
    try {
      return await this.authService.signInCompany(req.user_uid)
    } catch (error) {
      return error
    }
  }
}
