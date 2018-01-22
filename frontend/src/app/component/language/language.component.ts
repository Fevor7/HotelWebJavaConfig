import { Component } from "@angular/core"
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: 'language',
    templateUrl: './language.component.html',
    styleUrls: ['./language.component.css']
})
export class LanguageComponent {

    constructor(private translate: TranslateService) { }

    switchLanguage(language: string) {
        this.translate.use(language);
        localStorage.setItem('language', language);
    }

}