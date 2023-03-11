import { Component } from '@angular/core';
import { PayPlanService } from '../../../services/pay-plan.service';
import { PayService } from '../../../services/pay-services.service';

@Component({
  selector: 'app-page-plan',
  templateUrl: 'page-plan.component.html',
  styles: [],
})
export class PagePlanComponent {
  public services$ = this.payService.services$;
  public serviceLimit = this.payPlanService.serviceLimit;

  constructor(
    public payService: PayService,
    public payPlanService: PayPlanService
  ) {}
}
