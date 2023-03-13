import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageServicesComponent } from './page-services/page-services.component';
import { ROUTING } from './page-services.routing';
import { VasSharedModule } from '../vas-shared/vas-shared.module';
import { PayPlanModule } from '../vas-features/pay-plan/pay-plan.module';

@NgModule({
  declarations: [PageServicesComponent],
  imports: [CommonModule, VasSharedModule, PayPlanModule, ROUTING],
})
export class PageServicesModule {}
