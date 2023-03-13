import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanLimitReachedPipe } from './pipes/plan-limit-reached.pipe';

const SHARED_COMPONENTS = [PlanLimitReachedPipe];
@NgModule({
  declarations: [...SHARED_COMPONENTS],
  imports: [CommonModule],
  exports: [...SHARED_COMPONENTS],
})
export class PayPlanModule {}
