import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '@environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('🔵 API Request:', req.method, req.url);

  // Add API base URL if request doesn't start with http
  let apiReq = req;
  if (!req.url.startsWith('http')) {
    const fullUrl = `${environment.apiUrl}${req.url}`;
    console.log('🔗 Full URL:', fullUrl);
    
    apiReq = req.clone({
      url: fullUrl,
      setHeaders: {
        'Accept': 'application/json',
      }
    });
  }

  return next(apiReq).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('🔴 API Error:', error);
      console.error('Status:', error.status);
      console.error('Message:', error.message);
      console.error('URL:', error.url);
      
      if (error.status === 0) {
        console.error('❌ CORS or Network Error - Backend not reachable');
      } else if (error.status === 404) {
        console.error('❌ Endpoint not found');
      }
      
      return throwError(() => error);
    })
  );
};
