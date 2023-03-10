import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagePlanComponent } from './components/page-plan/page-plan.component';

const routes: Routes = [
  {
    path: '',
    component: PagePlanComponent,
    pathMatch: 'full',
  },
];

export const ROUTING: ModuleWithProviders<RouterModule> =
  RouterModule.forChild(routes);
