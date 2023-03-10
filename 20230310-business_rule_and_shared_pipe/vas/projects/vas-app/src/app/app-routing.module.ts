import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'plan',
    loadChildren: () =>
      import('../page-plan/page-plan.module').then((m) => m.PagePlanModule),
  },
  {
    path: 'services',
    loadChildren: () =>
      import('../page-services/page-services.module').then(
        (m) => m.PageServicesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
