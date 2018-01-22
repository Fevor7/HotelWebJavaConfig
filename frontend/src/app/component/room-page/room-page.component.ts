import { Component, OnInit, OnDestroy } from "@angular/core";
import { UnitService } from "../../service/unit.service";
import { Unit } from "../../model/unit";
import { Room } from "../../model/room";
import { RoomService } from "../../service/room.service";
import { ListPage } from "../../model/listPage";
import { OrderRoom } from "../../model/orderRoom";
import { Router, ActivatedRoute } from "@angular/router";
import { ISubscription } from "rxjs/Subscription";
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/takeUntil";
import { DataService } from "../../service/data.service";
import { RoomRequestService } from "../../service/room-request.service";

@Component({
    selector: 'room-page',
    templateUrl: './room-page.component.html',
    styleUrls: ['./room-page.component.css'],
    providers: [ DataService ]
})
export class RoomPageComponent implements OnInit, OnDestroy {

    private readonly unsubscribe: Subject<void> = new Subject();
    listTypeRoom: Unit[] = [];
    listRoom: Room[] = [];
    listPage: ListPage<Room> = new ListPage<Room>();
    sequenceNumber: number[] = [];

    constructor(private unitService: UnitService,
        private roomService: RoomService,
        private router: Router,
        private activeRoute: ActivatedRoute,
        private dataService: DataService,
        public roomRequestService: RoomRequestService) {}

    ngOnInit(): void {
        this.sequenceNumber = this.dataService.getSequenceNumber(5);
        this.unitService.getUnitList()
            .takeUntil(this.unsubscribe)
            .subscribe((data: Unit[]) => this.listTypeRoom = data,
            (error: any) => console.log(error));
        this.activeRoute.queryParams
            .takeUntil(this.unsubscribe)
            .subscribe(
            (params: OrderRoom) => {
                this.roomRequestService.setFields(params);
                this.loadListRoom();
            });
    }

    loadListRoom(): void {
        this.roomService.searchRoom(this.roomRequestService.order)
            .takeUntil(this.unsubscribe)
            .subscribe(
            (response: ListPage<Room>) => {
                this.listPage = response;
                this.listRoom = (response !== null) ? this.listPage.data : null;
            }, (error: any) => console.log(error.message));
        localStorage.setItem('roomOrder', JSON.stringify(this.roomRequestService.order));
    }

    searchRoom(): void {
        this.roomRequestService.order.pageNumber = 0;
        this.router.navigate([], { queryParams: this.roomRequestService.order });
    }

    switchPage(numerPage: number): void {
        this.roomRequestService.order.pageNumber = numerPage;
        this.router.navigate([], { queryParams: this.roomRequestService.order });
    }

    revert(): void {
        this.roomRequestService.createObject();
        this.router.navigate([], { queryParams: this.roomRequestService.order });
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

}