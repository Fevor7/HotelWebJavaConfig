import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpResponse, HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {

    private urlBase: string = 'http://localhost:9595/';
    // private urlBase: string = '';

    constructor(private http: HttpClient) { }

    /*
        send GET request
     */
    getData(url: string, obj?: any): Observable<any> {
        let httpParam = new HttpParams();
        if (obj) {
            Object.keys(obj).forEach(key => httpParam = httpParam.append(key, obj[key]));
        }
        return this.http.get(this.urlBase + url, { params: httpParam});
    }

    /*
        send POST request
     */
    postData(url: string, body: any): Observable<any> {
        let header: HttpHeaders = new HttpHeaders({'Refresh-Header':'on'});
        return this.http.post(this.urlBase + url, body);
    }

    /*
        send DELETE request
     */
    deleteData(url: string, body: any): Observable<any> {
        return this.http.delete(this.urlBase + url, body);
    }

    /*
        send PUT request
     */
    putData(url: string, body: any): Observable<any> {
        return this.http.put(this.urlBase + url, body);
    }

}