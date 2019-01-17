import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LotoAuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  resendModel: any = {};

  showForm: any = 0; // hide

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: LotoAuthService,
              private notification: NotificationService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      if(param['code'] != undefined) {
        console.log('code : ' + param['code']);
        
        this.authService.verifyCode({code: param['code'], type: 0}).subscribe(data => {
          if(data.success == true) {
            this.notification.showNotification('Success', data.msg, 'success');
            this.router.navigate(['/loto/login/0']);
          } else {
            this.showForm = 1;
            this.notification.showNotification('Failed', data.msg, 'error');
          }
        }, err => { 
          console.log(err);
        })
      }
    });
  }

  doResendEmail() {
    console.log('e : ' + JSON.stringify(this.resendModel));

    this.authService.resendEmail(this.resendModel).subscribe( data => {
      if(data.success == true) {
        this.showForm = 2;
      } else {
        this.notification.showNotification('Failed', data.msg, 'error');
      }
    }, err => { 
      console.log(err);
    });
  }

}
