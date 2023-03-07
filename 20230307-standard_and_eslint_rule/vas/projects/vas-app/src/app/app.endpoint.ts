import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { VasAuthDTO } from '../../../vas-generated/rest-api/models/VasAuthDTO';

@Injectable({
  providedIn: 'root',
})
export class AppEndpoint {
  constructor(httpClient: HttpClient) {}

  public getData$(): Observable<VasAuthDTO> {
    const response: VasAuthDTO = {
      name: 'Vas',
      guid: '1234-2342-1231-1231',
      key: 2655896,
    };
    return of(response).pipe(delay(2000));
  }
}
