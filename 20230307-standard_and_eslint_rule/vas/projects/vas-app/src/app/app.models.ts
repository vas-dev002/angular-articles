import { VasAuthDTO } from '../../../vas-generated/rest-api/models/VasAuthDTO';

export interface AuthData extends VasAuthDTO {
  isSomeTemplateRelated: boolean;
}
