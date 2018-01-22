import { Injectable } from "@angular/core";
import { OrderRoom } from "../model/orderRoom";
import { OnInit } from "@angular/core";
import { DataService } from "./data.service";

@Injectable()
export class RoomRequestService {
    
    order: OrderRoom = new OrderRoom();

    constructor(private dataService: DataService){
        let orderLocal: string = localStorage.getItem('roomOrder');
        if (orderLocal) {
            this.order = JSON.parse(orderLocal);
        } else {
            this.createObject();
            localStorage.setItem('roomOrder', JSON.stringify(this.order));
        }
    }
    
    createObject(){
        this.order.dateStart = this.dataService.fetchDate();
        this.order.dateEnd = this.dataService.fetchDate();
        this.order.bedNumber = 1;
        this.order.personNumber = 1;
        this.order.idTypeRoom = 1;
        this.order.minPrice = 20;
        this.order.maxPrice = 500;
        this.order.pageNumber = 0;
    }

    setFields(newOderRoom: OrderRoom): void {
        this.order.dateStart = newOderRoom.dateStart;
        this.order.dateEnd = newOderRoom.dateEnd;
        this.order.bedNumber = newOderRoom.bedNumber;
        this.order.personNumber = newOderRoom.personNumber;
        this.order.idTypeRoom = newOderRoom.idTypeRoom;
        this.order.minPrice = newOderRoom.minPrice;
        this.order.maxPrice = newOderRoom.maxPrice;
        this.order.pageNumber = newOderRoom.pageNumber;
    }

}
