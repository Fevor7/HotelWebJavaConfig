import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpSentEvent, HttpInterceptor, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HeaderService /*implements HttpInterceptor*/{
    constructor(){}
    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     req = req.clone({
    //         setHeaders: {
    //             'Refresh-Header':'on'
    //         }
    //       });
      
    //       return next.handle(req);
    // }

  
    


}