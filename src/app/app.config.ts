import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { getCustomPaginatorIntl } from './paginator/custom-paginator-intl';

registerLocaleData(ptBr);

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
              provideAnimationsAsync(),
              provideHttpClient(withInterceptors([tokenInterceptor])),
              provideEnvironmentNgxMask(),
              provideToastr(),
              { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
              { provide: LOCALE_ID, useValue: 'pt'},
              { provide: MatPaginatorIntl, useValue: getCustomPaginatorIntl() }
            ]
};