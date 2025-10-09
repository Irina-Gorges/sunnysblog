import { Routes } from '@angular/router';
import { MainContent } from './main-content/main-content';
import { Imprint } from './main-content/imprint/imprint';
import { Privacy } from './main-content/privacy/privacy';

export const routes: Routes = [
  { path: '', component: MainContent },
  { path: 'imprint', component:  Imprint},
  { path: 'privacy', component:  Privacy},
  { path: '**', redirectTo: '' },
];
