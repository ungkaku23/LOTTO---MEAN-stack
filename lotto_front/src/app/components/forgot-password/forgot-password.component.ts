import { Component, OnInit } from '@angular/core';
import { LotoAuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

declare var $: any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  captchaResponse: any = '';
  model: any = {};

  constructor(private authService: LotoAuthService,
              private notification: NotificationService) { }

  ngOnInit() {
    $('.email_submitted_notify').addClass('hide');
  }

  doSubmit() {

    console.log('logindata : ' + JSON.stringify(this.model));
    

    this.authService.forgotPassword(this.model).subscribe( data => {
      if(data.success == true) {
        $('.email_submitted_notify').removeClass('hide');

        $('.email_submitted_notify').addClass('show');
        $('.login_inputgroups').addClass('hide');
      } else {
        this.notification.showNotification('Failed', data.msg, 'error');
      }
    }, err => { 
      console.log(err);
    });

  }

  resolved(captchaResponse: string) {
    this.captchaResponse = captchaResponse;
    console.log('Resolved captcha with response : ' + captchaResponse);
  }

}
