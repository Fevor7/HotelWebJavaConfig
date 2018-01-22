import { Component, OnInit, transition } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private translate: TranslateService) {
        let language = localStorage.getItem('language');
        if (language) {
            translate.setDefaultLang(language);
        } else {
            translate.setDefaultLang(translate.getBrowserLang());
            localStorage.setItem('language', translate.getBrowserLang());
        }

    }

}
