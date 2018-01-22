import { Component, OnInit } from "@angular/core";
import { OrderRoom } from "../../model/orderRoom";
import { DataService } from "../../service/data.service";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import { Router, ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs/Subject";
import { RoomRequestService } from "../../service/room-request.service";

@Component({
    selector: 'menu-app',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    providers: [DataService]
})

export class MenuComponent {

    private readonly unsubscribe: Subject<void> = new Subject();

    constructor(private router: Router,
        private activeRoute: ActivatedRoute,
        public roomRequestService: RoomRequestService) { }


}