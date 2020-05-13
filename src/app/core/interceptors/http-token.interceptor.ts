import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";
import { TokenService } from '../services/token/token.service';

@Injectable({
  providedIn: "root"
})
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const token = this.tokenService.getAccessToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: "Bearer " + token
        }
      });
    }
    return next.handle(request);
  }
}