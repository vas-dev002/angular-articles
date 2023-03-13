import { Pipe, PipeTransform } from '@angular/core';
import { PayPlanHelper } from '../pay-plan.helper';

@Pipe({
  name: 'planLimitReached',
})
export class PlanLimitReachedPipe implements PipeTransform {
  transform(
    value: { servicesLimit: number; servicesCount: number },
    ...args: unknown[]
  ): unknown {
    return (
      !!value &&
      PayPlanHelper.isLimitReached(value.servicesCount, value.servicesLimit)
    );
  }
}
