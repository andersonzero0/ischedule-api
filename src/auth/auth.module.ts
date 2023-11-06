import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [UserModule, FirebaseModule, JwtModule.registerAsync({
    useFactory: () => ({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '30d'
      }
    })
  })],
  providers: [AuthService],
  exports: [],
  controllers: [AuthController]
})
export class AuthModule {}
