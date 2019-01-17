import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';

@Injectable()
export class DrawService {

  authToken: any; // authToken value
  user: any;

  constructor(private http: Http) { }

  loadLastDrawDatas() {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.base_url + 'draw/last_draw_data', {headers: headers})
        .map(res => res.json());
  }

  loadDrawConfigs() {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.base_url + 'draw/draw_configs', {headers: headers})
        .map(res => res.json());
  }

  loadDrawHistory(reqData) {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.base_url + 'draw/load_draw_history', reqData, {headers: headers})
        .map(res => res.json());
  }

  loadDrawDetail(dData) {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.base_url + 'draw/load_draw_detail', dData, {headers: headers})
        .map(res => res.json());
  }

}
