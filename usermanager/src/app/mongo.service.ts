import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http'
import {Observable} from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class MongoService {

    constructor (private http: Http) {}

    SaveUser(user) {
        return this.http.post('http://localhost:8080/api/saveUser' , user)
            .map((response: Response) => response.json())
    }

    UpdateUser(user) {
        return this.http.post('http://localhost:8080/api/updateUser' , user)
            .map((response: Response) => response.json())
    }

    GetUser(){
        return this.http.post('http://localhost:8080/api/getUser' , {})
            .map((response:Response) => response.json())
    }

    DeleteUser(id){
        return this.http.post('http://localhost:8080/api/deleteUser' , {'id':id})
            .map((response:Response) => response.json())
    }

    FindUser(user) {
        return this.http.post('http://localhost:8080/api/findUser' , user)
            .map((response: Response) => response.json())
    }
}