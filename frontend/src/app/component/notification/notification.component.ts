import { Component, Input, Output, EventEmitter } from "@angular/core"
import { OnInit, OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import { TranslateService } from "@ngx-translate/core";
import { Subject } from "rxjs/Subject";

@Component({
    selector: 'notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy{
       
    @Input() titleTranslate: string;
    @Input() notificationDisplay: boolean;
    @Output() notificationDisplayChange = new EventEmitter<boolean>();
    readonly buttonTranslate: string = 'windowMessage_closeWindowMessage';
    message: string = '';
    buttonTitle: string = '';
    private readonly unsubscribe: Subject<void> = new Subject();

    constructor(private translate: TranslateService){}

    ngOnInit(): void {
        this.translate.stream([this.titleTranslate, this.buttonTranslate])
        .takeUntil(this.unsubscribe)
        .subscribe(result => {
                this.message = result[this.titleTranslate];
                this.buttonTitle = result[this.buttonTranslate];
            }
        );
        
    }

    closeWindow() {
        this.notificationDisplay = false;
        this.notificationDisplayChange.emit(false);
    }

    ngOnDestroy(): void {
       this.unsubscribe.next();
       this.unsubscribe.complete();
    }

    
}