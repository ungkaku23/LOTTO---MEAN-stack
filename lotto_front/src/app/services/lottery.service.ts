import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';

@Injectable()
export class LotteryService {

  authToken: any; // authToken value
  user: any;

  constructor(private http: Http) { }

  saveTickets(ldata) {
    let headers = new Headers();

    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.base_url + 'lottery/save_tickets', ldata, {headers: headers})
        .map(res => res.json());
  }

  checkTicketsExist(ldata) {
    let headers = new Headers();

    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.base_url + 'lottery/check_ticket_exist', ldata, {headers: headers})
        .map(res => res.json());
  }

  loadLotteryArchiveData(ldata) {
    let headers = new Headers();

    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.base_url + 'lottery/load_archive_data', ldata, {headers: headers})
        .map(res => res.json());
  }

  loadLotteryResults(ldata) {
    let headers = new Headers();
    
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.base_url + 'lottery/load_lottery_results', ldata, {headers: headers})
        .map(res => res.json());
  }

  loadLotteryTopResults(ldata) {
    let headers = new Headers();
    
    this.loadToken();

    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.base_url + 'lottery/load_lottery_top_results', ldata, {headers: headers})
        .map(res => res.json());
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

}
