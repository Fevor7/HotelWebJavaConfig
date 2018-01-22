import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ListPage } from "../../model/listPage";
import { Room } from "../../model/room";
import { DataService } from "../../service/data.service";


@Component({
    selector: 'paging',
    templateUrl: './paging.component.html',
    styleUrls: ['./paging.component.css'],
    providers: [ DataService ]
})
export class PagingComponent {

    @Input() listPage: ListPage<Room>;
    @Output() changePage = new EventEmitter<number>();
    private quantityList: number[] = [];

    constructor(private dataService: DataService) { }

    public quantityPage(): number {
        this.quantityList = [];
        let quantity: number = Math.ceil((this.listPage.total) / (this.listPage.maxPerPage));
        if (quantity > 1) {
            this.quantityList = this.dataService.getSequenceNumber(quantity);
        }
        return quantity;
    }

    switchPage(numerPage: number) {
        this.changePage.emit(numerPage);
    }

}
