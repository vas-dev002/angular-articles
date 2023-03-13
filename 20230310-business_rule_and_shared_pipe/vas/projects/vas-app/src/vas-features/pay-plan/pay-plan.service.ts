import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PayPlanService {
  public readonly serviceLimit = 4;
}
