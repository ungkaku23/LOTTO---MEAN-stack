import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LotoAuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  newPwModel: any = {};
  code: any = '';

  showForm: any = 1; // show

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: LotoAuthService,
              private notification: NotificationService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      if(param['code'] != undefined) {
        console.log('code : ' + param['code']);
        
        this.code = param['code'];
      }
    });
  }

  doResetPassword() {
    console.log('e : ' + JSON.stringify(this.newPwModel));

    if(this.newPwModel.password == this.newPwModel.confirm_password) {
      this.authService.resetPassword({code: this.code, password: this.newPwModel.password }).subscribe(data => {
        if(data.success == true) {
          this.notification.showNotification('Success', data.msg, 'success');
          this.router.navigate(['/loto/login/0']);
        } else {
          this.showForm = 0;
          this.notification.showNotification('Failed', data.msg, 'error');
        }
      }, err => { 
        console.log(err);
      });
    } else {
      this.notification.showNotification('Failed', 'Passwords are not matched', 'error');
    }
  }

}
