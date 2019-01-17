import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';

@Injectable()
export class WithdrawWalletService {

  authToken: any; // authToken value
  user: any;

  constructor(private http: Http) { }

  loadWithdrawAddress() {
    let headers = new Headers();

    this.loadToken();

    headers.append('Authorization', this.authToken);
    return this.http.get(environment.base_url + 'withdraw_wallets/load_address', {headers: headers})
        .map(res => res.json());
  }

  saveWithdrawAddress(data) {
    let headers = new Headers();

    this.loadToken();

    headers.append('Authorization', this.authToken);
    return this.http.post(environment.base_url + 'withdraw_wallets/save_address', data, {headers: headers})
        .map(res => res.json());
  }

  updateWithdrawAddress(data) {
    let headers = new Headers();

    this.loadToken();

    headers.append('Authorization', this.authToken);
    return this.http.post(environment.base_url + 'withdraw_wallets/update_address', data, {headers: headers})
        .map(res => res.json());
  }

  removeWithdrawAddress(data) {
    let headers = new Headers();

    this.loadToken();

    headers.append('Authorization', this.authToken);
    return this.http.post(environment.base_url + 'withdraw_wallets/remove_address', data, {headers: headers})
        .map(res => res.json());
  }

  updateUsage(data) {
    let headers = new Headers();

    this.loadToken();

    headers.append('Authorization', this.authToken);
    return this.http.post(environment.base_url + 'withdraw_wallets/update_usage', data, {headers: headers})
        .map(res => res.json());
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

}
