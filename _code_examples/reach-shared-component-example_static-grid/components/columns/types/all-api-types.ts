import { ITypedController } from "../entity";
import { baseApiTypes } from "./base-api-types";
import { complexApiTypes } from "./complex-api-types";

export const allApiTypes: ITypedController[] = baseApiTypes.concat(complexApiTypes);
