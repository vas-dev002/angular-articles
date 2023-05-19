import { Injectable } from "@angular/core";

@Injectable()
export class DynamicGridKeySetIdService {
	private keySetId: number = undefined;

	public setKeySetId(keySetId: number) {
		this.keySetId = keySetId;
	}

	public getKeySetId(): number {
		return this.keySetId;
	}

	public resetKeySetId() {
		this.keySetId = undefined;
	}
}
