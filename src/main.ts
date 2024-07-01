import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import posthog from 'posthog-js';

const POSTHOG_KEY = 'phc_dNgKijYBPgs4tqBK9EQQFmp5gu3Hed8Pwe5DqkzSDR3';
const POSTHOG_HOST = 'https://eu.i.posthog.com';

posthog.init(POSTHOG_KEY, {
  api_host: POSTHOG_HOST,
  person_profiles: 'always', // or 'always' to create profiles for anonymous users as well,
  autocapture: false,
  advanced_disable_decide: true,
  disable_external_dependency_loading: true,
});

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
