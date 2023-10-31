import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [UserModule, FirebaseModule],
  providers: [],
  exports: [],
  controllers: []
})
export class AuthModule {}
