import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, FirebaseModule, JwtModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
