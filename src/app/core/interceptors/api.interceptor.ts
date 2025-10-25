import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith('http')) {
    req = req.clone({
      url: `${environment.apiUrl}${req.url}`
    });
  }

  req = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  return next(req);
};
