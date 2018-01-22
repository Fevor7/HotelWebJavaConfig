import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Order } from "../model/order";

@Injectable()
export class RoomService {

    constructor(private httpService: HttpService) { }

    searchRoom(order: Order) {
        return this.httpService.getData('rooms', order);
    }
}