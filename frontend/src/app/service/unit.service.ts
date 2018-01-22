import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";

@Injectable()
export class UnitService {

    constructor(private httpService: HttpService) { }

    /*
        request generation for fetch list type room
     */
    getUnitList() {
        return this.httpService.getData('rooms/type');
    }
}