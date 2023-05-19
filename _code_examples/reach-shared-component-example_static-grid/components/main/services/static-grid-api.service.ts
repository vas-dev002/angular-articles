import { Injectable, EventEmitter } from "@angular/core";
import { CellToUpdate } from "../entity";

@Injectable()
export class StaticGridApiService {
	public cellUpdate = new EventEmitter<CellToUpdate>();
}
