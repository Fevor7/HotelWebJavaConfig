import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Room } from "../../model/room";
import { ListPage } from "../../model/listPage";


@Component({
    selector: 'room-list',
    templateUrl: './room-list.component.html',
    styleUrls: ['./room-list.component.css']
})
export class RoomListComponent {

    @Input() listPage: ListPage<Room>;
    @Output() changePage = new EventEmitter<number>();

    switchPage(numerPage: number) {
        this.changePage.emit(numerPage);
    }


}