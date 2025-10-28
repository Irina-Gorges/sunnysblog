import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withViewTransitions, withEnabledBlockingInitialNavigation } from '@angular/router';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient(),
    provideRouter([], withViewTransitions(), withEnabledBlockingInitialNavigation())
  ]
}).catch((err) => console.error(err));
