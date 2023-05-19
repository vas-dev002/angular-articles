import { CustomFilterEnum } from '../../../../mentions/models/filters';
import { ICustomMentionFilter } from '../../../../mentions/models/filters/interfaces';
import { IMentionQueryFilter } from '../../../../mentions/models/search-mentions';

export interface IInfluencerMentionFilter {
  engagementFrom: number;
  followersFrom: number;
  followersTo: number;
}

export const DEFAULT_FILTER = {
  engagementFrom: null,
  followersFrom: null,
  followersTo: null,
};

export class InfluencerFilter implements ICustomMentionFilter {
  protected filterData: IInfluencerMentionFilter;
  protected maxFollowers = 2000000000;
  protected minFollowers = 0;
  protected minEngagement = 0;
  constructor(filterData: IInfluencerMentionFilter) {
    this.filterData = this.getValidData(filterData);
  }
  private getValidData(filterData: IInfluencerMentionFilter) {
    let engagementFrom = filterData.engagementFrom < this.minEngagement ? null : filterData.engagementFrom;
    const minValidation = (followers: number) => {
      return followers < this.minFollowers ? null : followers;
    };
    const maxValidation = (followers: number) => {
      return followers > this.maxFollowers ? this.maxFollowers : followers;
    };
    const validate = (followers: number) => {
      return followers === null ? null : maxValidation(minValidation(followers));
    };
    let followersFrom = validate(filterData.followersFrom);
    let followersTo = validate(filterData.followersTo);
    if (followersFrom !== null && followersTo !== null) {
      followersTo = followersTo >= followersFrom ? followersTo : followersFrom;
    } else {
      followersTo = followersTo;
    }
    return {
      engagementFrom,
      followersFrom,
      followersTo,
    };
  }

  public getFilterData(): IInfluencerMentionFilter {
    return this.filterData;
  }
  public getName(): CustomFilterEnum {
    return CustomFilterEnum.INFLUENCER_FILTER;
  }
  public getQuery(): IMentionQueryFilter {
    return this.filterData;
  }
}

export function influencerFilterFactory(filterData: IInfluencerMentionFilter): InfluencerFilter {
  const restoredData = {
    engagementFrom: filterData.engagementFrom,
    followersFrom: filterData.followersFrom,
    followersTo: filterData.followersTo,
  };
  return new InfluencerFilter(restoredData);
}
