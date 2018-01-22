import { Component, Input, OnInit, EventEmitter } from "@angular/core";
import { Unit } from "../../model/unit";
import { UnitService } from "../../service/unit.service";
import { DataService } from "../../service/data.service";
import { Order } from "../../model/order";
import { OrderService } from "../../service/order.service";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import { Subject } from "rxjs/Subject";
import { TranslateService } from "@ngx-translate/core";
import { Output } from "@angular/core/src/metadata/directives";

@Component({
    selector: 'first-page',
    templateUrl: './first-page.component.html',
    styleUrls: ['./first-page.component.css'],
    providers: [ DataService ]
})
export class FirstPageComponent implements OnInit, OnDestroy {

    private readonly unsubscribe: Subject<void> = new Subject();
    notificationDisplay: boolean = false;
    readonly createOrderMessage: string = 'newOrder_orderOk';
    readonly messageErrorTranslate: string = 'windowMessage_incorrectDataError';
    messageError: string = '';
    listTypeRoom: Unit[] = [];
    order: Order = new Order;
    typeRoom: Unit = new Unit;
    date: string = '';
    sequenceNumber: number[] = [];

    constructor(private unitService: UnitService,
        private dataService: DataService,
        private orderService: OrderService,
        private translate: TranslateService) { }

    /*
           initialization variable and receiving list type room
     */
    ngOnInit(): void {
        this.sequenceNumber = this.dataService.getSequenceNumber(5);
        this.order.dateStart = this.dataService.fetchDate();
        this.order.dateEnd = this.dataService.fetchDate();
        this.unitService.getUnitList()
            .takeUntil(this.unsubscribe)
            .subscribe((data: any) => {
                this.listTypeRoom = data;
                this.typeRoom.id = this.listTypeRoom[0].id;
            });
       this.subscribeTranslate();
    }


    private subscribeTranslate(): void {
        this.translate.stream(['newOrder_select'])
            .takeUntil(this.unsubscribe)
            .subscribe((result) => {
                this.order.bedNumber = result.newOrder_select;
                this.order.personNumber = result.newOrder_select;
            });
    }

    /*
        send request for create new order
     */
    createNewOrder() {
        this.order.typeRoom = this.typeRoom;
        this.orderService.createNewOrder(this.order)
            .takeUntil(this.unsubscribe)
            .subscribe((data: any) => {
                this.notificationDisplay = true;
                this.ngOnInit();
            },
            (error: any) =>
                console.log(error.status)
            );
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

}