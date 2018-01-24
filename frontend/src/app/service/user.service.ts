import { HttpService } from './http.service';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

    constructor(private httpService: HttpService){}

    fetchToken(){
        let headers = new HttpHeaders();
        headers.append("Access-Control-Expose-Headers", "Access-Control-*");
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Credentials', 'true');
        headers.append('Access-Control-Allow-Headers', 'Access-Control-*, Content-Type, Authorization, Accept');
        headers.append('Allow', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
        headers.append('Authorization','Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0');
        this.httpService.postData('oauth/token?grant_type=password&username=user&password=user', null, headers)
            .subscribe(result => console.log(result));
    }

}