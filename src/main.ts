import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import {
  HttpHandlerFn,
  HttpRequest,
  HttpResponse,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { tap } from 'rxjs';

const logInterceptor = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  console.log('Request', request.method, request.url, request.body);
  return next(request).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          console.log('Response', event.body);
        }
      },
    })
  );
};

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptors([logInterceptor]))],
}).catch((err) => console.error(err));
