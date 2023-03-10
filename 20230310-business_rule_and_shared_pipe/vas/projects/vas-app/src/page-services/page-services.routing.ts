import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageServicesComponent } from './page-services/page-services.component';

const routes: Routes = [
  {
    path: '',
    component: PageServicesComponent,
    pathMatch: 'full',
  },
];

export const ROUTING: ModuleWithProviders<RouterModule> =
  RouterModule.forChild(routes);
