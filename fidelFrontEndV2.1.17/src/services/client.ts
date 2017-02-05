import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class ClientService {
    constructor(private http: Http) {
    }

    getClientAll() {
        let repos = this.http.get(`http://DESKTOP-V9RI1K9.home:3000/api/v1/todos`);
        return repos;
    }

    getClientByName(name){
        console.log("client service" + name)
        let repos = this.http.get(`http://localhost:3000/api/v1/todos/${name}`);
        return repos;
    }

    getDetails(repo) {
        let headers = new Headers();
        headers.append('Accept', 'application/vnd.github.VERSION.html');

        return this.http.get(`${repo.url}/readme`, { headers: headers });
    }
}
