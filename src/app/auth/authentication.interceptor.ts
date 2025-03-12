import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {catchError, switchMap, throwError} from 'rxjs';

let isRefreshing = false;

export const authTokenInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthenticationService)
  const token: string | null = authService.token
  const refreshToken: string | null = authService.refreshToken

  if (!token || !refreshToken) return next(request)

  if(authService.baseApiUrl + '/refresh-token' == request.url) {
    return next(addToken(request, refreshToken))
  }

  if (isRefreshing) {
    return refreshAndProceed(authService, request, next)
  }

  return next(addToken(request, token)).pipe(
    catchError(error => {
      if (error.status === 403) {
        return refreshAndProceed(authService, request, next)
      }
      return throwError(error);
    })
  )
}

const refreshAndProceed = (
  authService: AuthenticationService,
  request: HttpRequest<any>,
  next: HttpHandlerFn) => {
  if (!isRefreshing) {
    isRefreshing = true;
    return authService.refreshAuthToken()
      .pipe(
        switchMap(response => {
          isRefreshing = false;
          return next(addToken(request, response.accessToken));
        })
      )
  }
  return next(addToken(request, authService.token!));
}

const addToken = (request: HttpRequest<any>, token: string) => {
  return request.clone({
      setHeaders: {Authorization: `Bearer ${token}`}
    }
  )
}
