import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagePlanComponent } from './components/page-plan/page-plan.component';
import { ROUTING } from './page-plan.routing';
import { VasSharedModule } from '../vas-shared/vas-shared.module';
import { PayPlanModule } from '../vas-features/pay-plan/pay-plan.module';

@NgModule({
  declarations: [PagePlanComponent],
  imports: [CommonModule, VasSharedModule, PayPlanModule, ROUTING],
})
export class PagePlanModule {}
