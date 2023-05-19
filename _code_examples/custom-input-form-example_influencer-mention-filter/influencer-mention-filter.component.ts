import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Self,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { ShortNumberPipe } from '../../../../core/pipes/short-number';
import { ICustomFilterComponent } from '../../../../mentions/components/mentions-list/mention-list.models';
import { ComponentAnalyticService } from './influencer-mention-filter-analytic.service';
import {
  DEFAULT_FILTER,
  IInfluencerMentionFilter,
  InfluencerFilter,
  influencerFilterFactory,
} from './influencer-mention-filter.models';

@Component({
  selector: 'influencer-mention-filter',
  templateUrl: './influencer-mention-filter.component.html',
  styleUrls: ['./influencer-mention-filter.component.scss'],
  providers: [ComponentAnalyticService],
})
export class InfluencerMentionFilterComponent implements OnInit, ICustomFilterComponent, OnDestroy {
  @Input() public set filter(filterValue: InfluencerFilter) {
    const allowSetValue = JSON.stringify(this.validFilterData) !== JSON.stringify(filterValue?.getFilterData());
    this.validFilterData = filterValue ? filterValue.getFilterData() : DEFAULT_FILTER;
    if (allowSetValue) {
      this.form.setValue(this.validFilterData, { emitEvent: false });
    }
  }
  @Output() public filterChange = new EventEmitter<InfluencerFilter>();

  public TRACKING = this.componentAnalyticService.TRACKING;

  public form = new FormGroup({
    engagementFrom: new FormControl(),
    followersFrom: new FormControl(),
    followersTo: new FormControl(),
  });
  public followersDisplayFunc = (value: number) => new ShortNumberPipe().transform(value);
  public engagementMask = /[^\d.]/g;
  public engagementMaxLength = 4;
  public followersMaxLength = 10;
  public validFilterData: IInfluencerMentionFilter = null;
  private onDestroy$ = new Subject();

  constructor(@Self() private componentAnalyticService: ComponentAnalyticService) {}

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public ngOnInit(): void {
    this.initChangesEvents();
    this.componentAnalyticService.initAnaltyticEvents({
      engagementChanges$: this.form.get('engagementFrom').valueChanges,
      followersMinChanges$: this.form.get('followersFrom').valueChanges,
      followersMaxChanges$: this.form.get('followersTo').valueChanges,
    });
  }

  private initChangesEvents() {
    this.form.valueChanges
      .pipe(
        takeUntil(this.onDestroy$),
        distinctUntilChanged(
          (x, y) => x === y,
          z => JSON.stringify(z),
        ),
        map(() => {
          const rawFilterData = this.form.value as IInfluencerMentionFilter;
          const filter = influencerFilterFactory(rawFilterData);
          this.validFilterData = filter.getFilterData();
          return filter;
        }),
        debounceTime(500),
      )
      .subscribe(filter => {
        this.filterChange.next(filter);
      });
  }

  public onFollowersFocusOut() {
    this.form.setValue(this.validFilterData, { emitEvent: false });
  }

  public onInputFocus(eventName: string) {
    this.componentAnalyticService.trackEventManually(eventName);
  }
}
