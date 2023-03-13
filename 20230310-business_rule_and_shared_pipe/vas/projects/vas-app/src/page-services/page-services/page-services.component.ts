import { Component } from '@angular/core';
import { PayPlanService } from '../../vas-features/pay-plan/pay-plan.service';
import { PayService } from '../../services/pay-services.service';

@Component({
  selector: 'app-page-services',
  templateUrl: 'page-services.component.html',
  styles: [],
})
export class PageServicesComponent {
  public services$ = this.payService.services$;
  public serviceLimit = this.payPlanService.serviceLimit;

  constructor(
    public payService: PayService,
    public payPlanService: PayPlanService
  ) {}
}
