import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class FidelService {
    constructor(private http:Http) {
    }

    getAll() {
        let client = this.http.get(`http://localhost:3000/api/v1/todos`);
        return client;
    }
}
