import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import * as requestIp from 'request-ip';

@Injectable()
export class AuthGuardIpAccess implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const ip = requestIp.getClientIp(request);
    if (ip == "::1" || process.env.IP_ACCESS == ip) {
      return true;
    }
    return false;
  }
}