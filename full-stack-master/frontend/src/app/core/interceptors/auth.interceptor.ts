import { HttpInterceptorFn, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { baseUrl } from '../apiRoot/baseUrl';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let token: string | null = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  const http = inject(HttpClient);

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (
        error.status === 401 &&
        typeof window !== 'undefined' &&
        !req.url.includes('/auth/login') &&
        !req.url.includes('/auth/refreshToken')
      ) {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          return http
            .post<{ accessToken?: string; token?: string; refreshToken?: string }>(
              `${baseUrl}/api/v1/auth/refreshToken`,
              { refreshToken }
            )
            .pipe(
              switchMap((res) => {
                const newToken = res.accessToken || res.token;
                if (newToken) {
                  localStorage.setItem('token', newToken);
                  if (res.refreshToken) {
                    localStorage.setItem('refreshToken', res.refreshToken);
                  }
                  const retryReq = req.clone({
                    setHeaders: {
                      Authorization: `Bearer ${newToken}`,
                    },
                  });
                  return next(retryReq);
                }
                return throwError(() => error);
              }),
              catchError((refreshErr) => {
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('username');
                localStorage.removeItem('userRole');
                return throwError(() => refreshErr);
              })
            );
        }
      }
      return throwError(() => error);
    })
  );
};
