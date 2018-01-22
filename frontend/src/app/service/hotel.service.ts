import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";

@Injectable()
export class HotelService {

    constructor(private httpService: HttpService) { }

    fetchHotelInfo() {
        return this.httpService.getData('hotel');
    }

}