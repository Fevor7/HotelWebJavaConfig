import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Hotel } from "../model/hotel";
import { Observable } from "rxjs/Observable";

@Injectable()
export class HotelService {

    constructor(private httpService: HttpService) { }

    fetchHotelInfo() : Observable<Hotel>{
        return this.httpService.getData('hotel');
    }

}