import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from "@angular/common/http/";
import { MenuComponent } from "./component/menu/menu.component";
import { FirstPageComponent } from "./component/first-page/first-page.component";
import { RoomPageComponent } from "./component/room-page/room-page.component";
import { LanguageComponent } from "./component/language/language.component";
import { RouterModule, Routes } from "@angular/router";
import { HttpService } from "./service/http.service";
import { UnitService } from "./service/unit.service";
import { DataService } from "./service/data.service";
import { OrderService } from "./service/order.service";
import { UserService } from "./service/user.service";
import { HeaderService } from './service/header.service'
import { SliderComponent } from "./component/slider/slider.component";
import { RoomService } from "./service/room.service";
import { RoomRequestService } from "./service/room-request.service";
import { AboutPageComponent } from "./component/about-page/about-page.component";
import { HotelService } from "./service/hotel.service";
import { RoomListComponent } from "./component/room-list/room-list.component";
import { PagingComponent } from "./component/paging/paging.component";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NotificationComponent } from './component/notification/notification.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const appRoutes: Routes = [
    { path: '', component: FirstPageComponent },
    { path: 'room', component: RoomPageComponent },
    { path: 'about', component: AboutPageComponent }
]
@NgModule({
    imports: [BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    declarations: [
        AppComponent,
        MenuComponent,
        FirstPageComponent,
        RoomPageComponent,
        SliderComponent,
        AboutPageComponent,
        RoomListComponent,
        PagingComponent,
        LanguageComponent,
        NotificationComponent],
    bootstrap: [AppComponent],
    providers: [
        HttpService,
        UnitService,
        OrderService,
        RoomService,
        HotelService,
        DataService,
        RoomRequestService,
        UserService
    /*{provide: HTTP_INTERCEPTORS, useClass: HeaderService, multi: true }*/]
})
export class AppModule { }
