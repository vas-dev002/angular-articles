import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { VasAuthDTO } from '../../../vas-generated/rest-api/models/VasAuthDTO';
import { AppEndpoint } from './app.endpoint';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: [],
})
export class AppComponent implements OnDestroy {
  public title = 'vas-app';
  public authData: VasAuthDTO | null = null;
  private destroy$ = new Subject<boolean>();

  constructor(private appEndpoint: AppEndpoint) {}

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public getText() {
    this.appEndpoint
      .getData$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.authData = data;
      });
  }
}
