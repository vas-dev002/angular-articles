import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { AnalyticStateService } from '../../../../services/temp.analytic-state.service';
import { TRACK_EVENTS } from '../analytic/influencers-mode.analytic';

@Injectable()
export class ComponentAnalyticService implements OnDestroy {
  public readonly TRACKING = TRACK_EVENTS;
  constructor(private analyticStateService: AnalyticStateService) {}
  private onDestroy$ = new Subject();
  private searchDelayMs = 30000;

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public trackEventManually(eventName: string) {
    this.analyticStateService.trackEventManually({
      search: eventName,
    });
  }

  public initAnaltyticEvents(events: {
    engagementChanges$: Observable<number>;
    followersMinChanges$: Observable<number>;
    followersMaxChanges$: Observable<number>;
  }) {
    this.subscribeOnSearchEvent(events.engagementChanges$, this.TRACKING.engagement_rate_search);
    this.subscribeOnSearchEvent(events.followersMinChanges$, this.TRACKING.followers_min_search);
    this.subscribeOnSearchEvent(events.followersMaxChanges$, this.TRACKING.followers_max_search);
  }

  private subscribeOnSearchEvent(event$: Observable<number>, eventName: string) {
    event$.pipe(distinctUntilChanged(), debounceTime(this.searchDelayMs), takeUntil(this.onDestroy$)).subscribe(() => {
      this.trackEventManually(eventName);
    });
  }
}
