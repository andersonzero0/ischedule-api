import { Injectable, NestMiddleware } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { Auth, getAuth } from "firebase/auth";
import * as serviceAccount from './ischedule-6fd46-firebase-adminsdk-upp38-1d2a621138.json'
import { App } from 'firebase-admin/app';
import { Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  
  use(req: Request, res: Response, next: Function) {
    const token = req.headers.authorization;

    if(token != null && token != '') {

      const app = firebase.initializeApp({
        credential: firebase.credential.cert({
          projectId: serviceAccount.project_id,
          clientEmail: serviceAccount.client_email,
          privateKey: serviceAccount.private_key_id
        })
      })

      app.auth().verifyIdToken(token.replace('Bearer ', '')) 
      .then(async decodedToken => {
        const user = {
          email: decodedToken.email
        }

        req['user'] = user
        next();
      }).catch((e: Error) => {
        console.error(e)
        this.accessDenied(req.url, res)
      })

    } else {
      next();
    }
  }

  private accessDenied(url: string, res: Response) {
    res.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: url,
      message: 'Access Denied'
    })
  }
}
