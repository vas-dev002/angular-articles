import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagePlanComponent } from './components/page-plan/page-plan.component';
import { ROUTING } from './page-plan.routing';

@NgModule({
  declarations: [PagePlanComponent],
  imports: [CommonModule, ROUTING],
})
export class PagePlanModule {}
