import { Component, OnInit } from '@angular/core';
import { LotoAuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedinLoginProvider
} from 'angular5-social-auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  captchaResponse: any = '';

  constructor(private authService: LotoAuthService,
              private notification: NotificationService,
              private router: Router,
              private socialAuthService: AuthService) { }

  ngOnInit() {
  }

  doRegister() {

    console.log('regdata : ' + JSON.stringify(this.model));
    if(this.model.password == this.model.confirm_password)
    {
      let finalData = {};
      for (let key in this.model)
      {
        if(key != 'confirm_password')
        {
          finalData[key] = this.model[key];
        }
      }

      this.authService.registerUser(finalData).subscribe(data => {
        if(data.success) {
          this.notification.showNotification('Success', data.msg, 'success');
          this.router.navigate(['/loto/login/0']);
        } else {
          this.notification.showNotification('Failed', data.msg, 'error');
        }
      });
    } else {
      this.notification.showNotification('Failed', 'Password is not matched', 'error');
    }

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

  resolved(captchaResponse: string) {
    this.captchaResponse = captchaResponse;
    console.log('Resolved captcha with response : ' + captchaResponse );
  }

}
