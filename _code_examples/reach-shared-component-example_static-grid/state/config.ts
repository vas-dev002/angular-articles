import { Provider } from "@angular/core";

import { StaticGridEffects } from "./effects/effect";
import { multipleStoreProviders } from "./multiple-store/multiple-store";
import { staticGridReducer } from "./reducers/reducer";
import { GridSelectors } from "./selectors/selector";
import { TopBarSelectors } from "./selectors/topbar";

export function multipleGridStoreProviders(gridKey: string): Provider[] {
	return multipleStoreProviders(
		gridKey,
		staticGridReducer,
		StaticGridEffects,
		[GridSelectors, TopBarSelectors]
	);
}
