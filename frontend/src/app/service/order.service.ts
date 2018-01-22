import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Order } from "../model/order";


@Injectable()
export class OrderService {

    constructor(private httpService: HttpService) { }

    /*
        request generation for create new order
     */
    createNewOrder(order: Order) {
        return this.httpService.postData('order', order);
    }

}