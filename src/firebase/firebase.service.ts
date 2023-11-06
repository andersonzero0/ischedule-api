import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import {
  Auth as AuthAdmin,
  getAuth as getAuthAdmin,
} from 'firebase-admin/auth';
import { App } from 'firebase-admin/app';

@Injectable()
export class FirebaseService {
  private appAdmin: App;
  private authAdmin: AuthAdmin;
  constructor() {
    this.appAdmin = admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: process.env.CLIENT_EMAIL,
        privateKey: process.env.PRIVATE_KEY,
        projectId: process.env.PROJECT_ID,
      }),
    });
    this.authAdmin = getAuthAdmin(this.appAdmin);
  }

  async verifToken(token: string) {
    try {
      const decodedToken = await this.authAdmin.verifyIdToken(token);

      return decodedToken;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async getUser(uid: string) {
    try {
      return await this.authAdmin.getUser(uid)
    } catch (error) {
      return error
    }
  }

  async deleteUser(uid: string) {
    try {
      return await this.authAdmin.deleteUser(uid)
    } catch (error) {
      return error
    }
  }
}
