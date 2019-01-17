import { Component, OnInit } from '@angular/core';
import { LotoAuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderService } from '../../services/header.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.css']
})
export class SocialLoginComponent implements OnInit {

  smsmodel: any = {};

  goParam: any = '0';
  myData: any = {};
  showCodePanel: any = false;

  constructor(private authService: LotoAuthService,
              private notification: NotificationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private headerService: HeaderService,
              private socketService: SocketService) { }

  ngOnInit() {
    this.doVerification();
  }

  doVerification() {
    this.activatedRoute.params.subscribe(param => {
      if(param['code'] != undefined) {
        console.log('code : ' + param['code']);
        
        this.authService.verifyCode({code: param['code'], type: 1}).subscribe(data => {
          if(data.success == true) {
            this.notification.showNotification('Success', data.msg, 'success');
            
            console.log('data : ' + JSON.stringify(data));

            this.myData = data;
            this.showCodePanel = data.user.phonenumber_verified;

            if(data.user.phonenumber_verified) {

            } else {
              this.doRealLogin(data);
            }

          } else {
            this.notification.showNotification('Failed', data.msg, 'error');
          }
        }, err => {
          console.log(err);
        });

      }
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

    this.goParam = localStorage.getItem('goParam');

    if(this.goParam != undefined) {
      if(this.goParam == '0') {
        localStorage.removeItem('goParam');
        this.router.navigate(['/']);
      } else {
        localStorage.removeItem('goParam');
        this.router.navigate(['/loto/mypage-account/0']);
      }
    } else {
      this.router.navigate(['/']);
    }

    this.socketService.pushNotification_socketConfiguration();

  }

}
