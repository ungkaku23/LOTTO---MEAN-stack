import { Component, OnInit } from '@angular/core';
import { LotoAuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderService } from '../../services/header.service';

import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedinLoginProvider
} from 'angular5-social-auth';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  captchaResponse: any = '';
  model: any = {};
  smsmodel: any = {};

  goParam: any = 0;
  myData: any = {};
  showCodePanel: any = false;

  constructor(private authService: LotoAuthService,
              private notification: NotificationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private headerService: HeaderService,
              private socialAuthService: AuthService,
              private socketService: SocketService) { }

  ngOnInit() {
  }

  doLogin() {

    console.log('logindata : ' + JSON.stringify(this.model));

    this.activatedRoute.params.subscribe(param => {
      if(param['go'] != undefined)
      {
        this.goParam = param['go'];

        this.authService.loginUser(this.model).subscribe(data => {
          if(data.success) {
            this.notification.showNotification('Success', data.msg, 'success');

            this.myData = data;
            this.showCodePanel = data.user.phonenumber_verified;

            if(data.user.phonenumber_verified)
            {

            } else {
              this.doRealLogin(data);
            }
          } else {
              this.notification.showNotification('Failed', data.msg, 'error');
          }
        });
      }
    });
    
  }

  doRegisterWithSocial(socialPlatform) {
    let socialPlatformProvider;

    switch (socialPlatform) {
      case 'facebook':
        socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        break;
      case 'twitter':
        break;
      case 'google':
        console.log('will google login');
        socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        break;

      default:
        break;
    }

    if(socialPlatform != 'twitter') {
      this.socialAuthService.signIn(socialPlatformProvider).then(
        (userData) => {
          console.log(socialPlatform+" sign in data : " , userData);
          let accData = { nickname: userData.name,
                          email: userData.email};
          this.doWithSocialAccData(accData);
        }
      );
    } else {
      this.authService.loginWithTwitter().then((data) => {
        console.log('twitter data : ' + JSON.stringify(data));
        let accData = { nickname: data.auth.providerData[0].displayName,
                        email: data.auth.providerData[0].email };
        this.doWithSocialAccData(accData);
        // console.log('twitter data : ' + data['auth']['email']);
      });
    }
    
  }

  doWithSocialAccData(data) {
    this.authService.doWithSocialAccount(data).subscribe(wsa_data => {
      if(wsa_data.success == true) {
        if(wsa_data.directFlag != undefined) {
          this.router.navigate(['/loto/social-login/' + wsa_data.user._id]);
        } else {
          this.notification.showNotification('Success', wsa_data.msg, 'success');
        }
      } else {
        this.notification.showNotification('Failed', wsa_data.msg, 'error');
      }
    }, err => {
      console.log(err);
    });
  }

  doVerifyLoginCode() {
    console.log('coder : ' + JSON.stringify(this.smsmodel));

    this.authService.checkSMSCodeAtLogin(this.smsmodel, this.myData.token).subscribe(vdata => {
      if(vdata.success == true) {
        this.myData.user['phonenumber_verified'] = vdata.phonenumber_verified;

        this.doRealLogin(this.myData);

        this.notification.showNotification('Success', vdata.msg, 'success');
      } else {
        this.notification.showNotification('Failed', vdata.msg, 'error');
      }
    }, err => {
      console.log(err);
    })
  }

  doRealLogin(data) {
    this.authService.storeUserData(data);

    this.headerService.updateAvatar();

    if(this.goParam == 0) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/loto/mypage-account/0']);
    }

    this.socketService.pushNotification_socketConfiguration();
  }

  resolved(captchaResponse: string) {
    this.captchaResponse = captchaResponse;
    console.log('Resolved captcha with response : ' + captchaResponse);
  }

}
