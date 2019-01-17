import { Component, OnInit } from '@angular/core';
import { LotoAuthService } from '../../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  captchaResponse: any = '';
  model: any = {};
  result: any = 0;

  tid = 1; // contactus

  constructor(private authService: LotoAuthService) { }

  ngOnInit() {
    
  }

  doContact(formObj) {

    console.log('contactdata : ' + JSON.stringify(this.model));
    this.model['ctype'] = this.tid;

    this.authService.sendContactUSEmail(this.model).subscribe( data => {
      if(data.success == true) {
        this.result = 1; //success;
        $('#resultModal').modal('show');
      } else {
        this.result = 2; //fail;
        $('#resultModal').modal('show');
      }

      formObj.resetForm();
      this.model = {};
      
    }, err => {
      console.log(err);
    });

  }

  resolved(captchaResponse: string) {
    this.captchaResponse = captchaResponse;
    console.log('Resolved captcha with response : ' + captchaResponse);
  }

  clickedTab(id) {
    this.tid = id;
  }

  closeModal() {
    $('#resultModal').modal('hide');
  }


}
