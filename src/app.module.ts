import {
  Module,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
import { ServicesCompanyModule } from './services-company/services-company.module';
import { ProfessionalsModule } from './professionals/professionals.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    FirebaseModule,
    ServicesCompanyModule,
    ProfessionalsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
