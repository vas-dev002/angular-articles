import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DEFAULT_PAY_SERVICE_LIST, IPayService } from './pay-services.models';

@Injectable({
  providedIn: 'root',
})
export class PayService {
  private _services$ = new BehaviorSubject<IPayService[]>([
    ...DEFAULT_PAY_SERVICE_LIST,
  ]);

  public services$ = this._services$.asObservable();
}
