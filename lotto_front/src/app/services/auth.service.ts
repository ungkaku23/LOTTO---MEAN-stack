import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

// gauy
@Injectable()
export class LotoAuthService {

  authToken: any; // authToken value
  user: any;

  constructor(private http: Http,
              private af: AngularFire) { }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.base_url + 'user/register', user, {headers: headers})
        .map(res => res.json());
  }

  loginUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.base_url + 'user/authenticate', user, {headers: headers})
        .map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();

    this.loadToken();
    
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(environment.base_url + 'user/profile', {headers: headers})
        .map(res => res.json());
  }

  verifyCode(codeData) {
    let headers = new Headers();
    
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.base_url + 'user/verification', codeData, {headers: headers})
        .map(res => res.json());
  }

  resendEmail(emailData) {
    let headers = new Headers();
    
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.base_url + 'user/resend-email', emailData, {headers: headers})
        .map(res => res.json());
  }

  forgotPassword(emailData) {
    let headers = new Headers();
    
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.base_url + 'user/forgot-password', emailData, {headers: headers})
        .map(res => res.json());
  }

  resetPassword(pwData) {
    let headers = new Headers();
    
    headers.append('Content-Type', 'application/json');
    return this.http.post(environment.base_url + 'user/reset-password', pwData, {headers: headers})
        .map(res => res.json());
  }

  updateProfile(profileData) {
    let headers = new Headers();
    
    this.loadToken();
    
    headers.append('Authorization', this.authToken);
    return this.http.post(environment.base_url + 'user/profile-update', profileData, {headers: headers})
        .map(res => res.json());
  }

  updateEmail(emailData) {
    let headers = new Headers();

    this.loadToken();

    headers.append('Authorization', this.authToken);
    return this.http.post(environment.base_url + 'user/email-update', emailData, {headers: headers})
        .map(res => res.json());
  }

  updatePassword(passwordData) {
    let headers = new Headers();

    this.loadToken();

    headers.append('Authorization', this.authToken);
    return this.http.post(environment.base_url + 'user/password-update', passwordData, {headers: headers})
        .map(res => res.json());
  }

  updateNotifications(notificationData) {
    let headers = new Headers();

    this.loadToken();

    headers.append('Authorization', this.authToken);
    return this.http.post(environment.base_url + 'user/notifications-update', notificationData, {headers: headers})
        .map(res => res.json());
  }

  update2StepVerification(svdata) {
    let headers = new Headers();

    this.loadToken();

    headers.append('Authorization', this.authToken);
    return this.http.post(environment.base_url + 'user/sms-2stepverification-update', svdata, {headers: headers})
        .map(res => res.json());
  }

  sendSmsAndGenerateCode(svdata) {
    let headers = new Headers();

    this.loadToken();

    headers.append('Authorization', this.authToken);
    return this.http.post(environment.base_url + 'user/sms-send-and-generatecode', svdata, {headers: headers})
        .map(res => res.json());
  }

  checkSMSCode(svdata) {
    let headers = new Headers();

    this.loadToken();

    headers.append('Authorization', this.authToken);
    return this.http.post(environment.base_url + 'user/sms-check-code', svdata, {headers: headers})
        .map(res => res.json());
  }

  loginWithTwitter() {
    console.log('twitter login');
    return this.af.auth.login({
      provider: AuthProviders.Twitter,
      method: AuthMethods.Popup
    });
    // return this.af.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
  }

  checkSMSCodeAtLogin(svdata, token) {
    let headers = new Headers();

    console.log('tokena : ' + token );

    headers.append('Authorization', token);
    return this.http.post(environment.base_url + 'user/sms-check-code', svdata, {headers: headers})
        .map(res => res.json());
  }

  doWithSocialAccount(accData) {

    let headers = new Headers();

    return this.http.post(environment.base_url + 'user/access-with-socialaccount', accData, {headers: headers})
        .map(res => res.json());

  }
  
  sendContactUSEmail(eData) {
    let headers = new Headers();

    return this.http.post(environment.base_url + 'user/send-contact-email', eData, {headers: headers})
        .map(res => res.json());
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  storeUserData(user) {

    let userinfos = user.user;
    delete userinfos['w_private_key'];

    this.authToken = user.token;
    this.user = userinfos;
    localStorage.setItem('userData', JSON.stringify(userinfos));
    localStorage.setItem('token', user.token);

    // this.socketService.pushNotification_socketConfiguration();

  }

  storeProfileData(data) {
    console.log('storeProfileData: ' + JSON.stringify(data));
    localStorage.setItem('userData', JSON.stringify(data));
  }

  loggedIn() {
    return tokenNotExpired('token');
  }

  logOut() {
    this.authToken = null;
    this.user = null;
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
  }

}
