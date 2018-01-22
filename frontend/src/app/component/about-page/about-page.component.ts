import { Component, OnInit } from "@angular/core";
import { HotelService } from "../../service/hotel.service";
import { Hotel } from "../../model/hotel";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import { Subject } from "rxjs/Subject";

@Component({
    selector: 'about-page',
    templateUrl: './about-page.component.html',
    styleUrls: ['./about-page.component.css'],
    providers: [HotelService]
})
export class AboutPageComponent implements OnInit, OnDestroy {

    hotel: Hotel = new Hotel();
    private readonly unsubscribe: Subject<void> = new Subject();

    constructor(private hotelService: HotelService) { };

    ngOnInit(): void {
        this.hotelService.fetchHotelInfo()
            .takeUntil(this.unsubscribe)
            .subscribe((data: Hotel) => {
                this.hotel = data;
            }, (error: any) => console.log(error.message));
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}