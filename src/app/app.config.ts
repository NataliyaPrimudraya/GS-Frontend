import {ApplicationConfig, provideZoneChangeDetection, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import {routes} from './app.routes';
import Nora from '@primeng/themes/nora';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {TranslocoHttpLoader} from './transloco-loader';
import {provideTransloco} from '@jsverse/transloco';
import {cookiesStorage, provideTranslocoPersistLang} from '@jsverse/transloco-persist-lang';
import {authTokenInterceptor} from './auth/authentication.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Nora
      }
    }),
    provideHttpClient(withInterceptors([authTokenInterceptor])),
    provideTransloco({
      config: {
        availableLangs: ['en', 'ru'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader
    }),
    provideTranslocoPersistLang({
        storage: {
          useValue: cookiesStorage(),
        }
      }
    )
  ]
};

