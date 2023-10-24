import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ".env"
  }), PrismaModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
