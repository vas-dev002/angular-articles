import { Observable } from "rxjs";
import { StaticGridComponent } from "./main/comp";

export interface IStaticGridWrapper {
	gridReady$: Observable<StaticGridComponent>;
}
