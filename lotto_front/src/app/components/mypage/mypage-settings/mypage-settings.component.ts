import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';

import { ICountry } from 'angular2-countrypicker';
import { CountryPickerService } from 'angular2-countrypicker';
import * as _ from 'lodash';
import { LotoAuthService } from '../../../services/auth.service';
import { NotificationService } from '../../../services/notification.service';

import { environment } from '../../../../environments/environment';
import { HeaderService } from '../../../services/header.service';

declare var $: any;

@Component({
  selector: 'app-mypage-settings',
  templateUrl: './mypage-settings.component.html',
  styleUrls: ['./mypage-settings.component.css']
})
export class MypageSettingsComponent implements OnInit {

  baseUrl: any = '';

  tabIndObj = {ind1: 1, ind2: 2, ind3: 3, ind4: 4, ind5: 5, ind6: 6};
  tabIndex = 5;

  smenu_clicked = -1;

  userData: any = {};
  
  /* start profile section */
  profile_model: any = {country: '', avatar: ''};
  profile_errs: any = {};

  profile_form_data: FormData;
  @ViewChild('avatarInput') avatarInput: ElementRef;
  Avatardata: any;
  AvatarcropperSettings: CropperSettings;
  @ViewChild('cropper', undefined)
  Avatarcropper: ImageCropperComponent;

  public countries: ICountry[];

  socialAccPart: any = false;
  /* end profile section */

  /* start email section */
  email_model: any = {};
  /* end email section */

  /* start password section */
  pw_model: any = {};
  /* end password section */

  /* start 2stepverify section */
  step2_verifyflag: any = false; // off
  sms_sender_model: any = {smscountry: ''};
  sms_auth_model: any = {};
  /* end 2stepverify section */

  /* start notification section */
  notification_model: any = {};
  /* end notification section */


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private countryPickerService: CountryPickerService,
              private authService: LotoAuthService,
              private notification: NotificationService,
              private headerService: HeaderService) {
    
    this.AvatarcropperSettings = new CropperSettings();
    this.AvatarcropperSettings.noFileInput = true;
    this.AvatarcropperSettings.width = 200;
    this.AvatarcropperSettings.height = 200;
    this.AvatarcropperSettings.croppedWidth = 200;
    this.AvatarcropperSettings.croppedHeight = 200;
    this.AvatarcropperSettings.rounded = true;
    this.Avatardata = {};

  }

  ngOnInit() {

    this.baseUrl = environment.base_url;
    this.loadMypagesHeader();

    this.activatedRoute.params.subscribe(param => {
      if(param['stype'] != undefined)
      {
        this.smenu_clicked = param['stype'];
        switch (param['stype']) {
          case '1': //profile tab
            console.log('ra');
            this.countryPickerService.getCountries().subscribe(countries => {
              this.countries = countries.sort((a: ICountry, b: ICountry) => {
                let na = a.name.common;
                let nb = b.name.common; 
                if (na > nb) {
                  return 1;
                }
                if (na < nb) {
                  return -1;
                }
                return 0;
              });

              this.loadProfileData();
            });
            // this.profile_model = {country : '', nickname : 'Jhon123'}; // load profile data
            break;
        
          default:
            break;
        }
      }
    });
  }


  setTabInfo(tabindex) {
    this.tabIndex = tabindex;

    switch(this.tabIndex) {
      case 0:
        this.router.navigate(['/loto/mypage-account/0']);
        break;
      case 1:
        this.router.navigate(['/loto/mypage-lottery-results']);
        break;
      case 2:
        this.router.navigate(['/loto/mypage-deposit-withdraw']);
        break;
      case 3:
        this.router.navigate(['/loto/mypage-myhistory']);
        break;
      case 4:
        this.router.navigate(['/loto/mypage-message']);
        break;
      case 5:
        this.router.navigate(['/loto/mypage-settings/1']);
        break;
    }
  }

  clickSmenu(index) {
    this.smenu_clicked = index;
  }

  loadMypagesHeader() {
    this.userData = JSON.parse(localStorage.getItem('userData'));

    this.notification_model = this.userData.notifications;
    this.step2_verifyflag = this.userData.two_step_verification;
  }

  /* start profile section */

  loadProfileData() {
    
    let tempuserData = JSON.parse(localStorage.getItem('userData'));
    
    for (let key in tempuserData) {
      if((key != '_id') && (key != 'verified') && 
         (key != 'password') && (key != 'origin_password') && 
         (key != 'notifications') && (key != 'verified'))
      {
        this.profile_model[key] = tempuserData[key];
      }
    }

    if(this.profile_model.date_of_birth != undefined) {
      let bdate = this.profile_model.date_of_birth;
      this.profile_model['year'] = bdate.split('.')[0];
      this.profile_model['month'] = bdate.split('.')[1];
      this.profile_model['day'] = bdate.split('.')[2];
    }
    
    if(this.profile_model.country == undefined)
    {
      this.profile_model.country = '';
    }

    console.log('profile model : ' + JSON.stringify(this.profile_model));

  }

  b64toBlob(b64Data, contentTyper) {
    let contentType = contentTyper || '';
    let sliceSize = 512;

    let byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);

      let byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      let byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    let blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
  convertToBlob(bsdata) {
    console.log('bsdata : ' + bsdata);
    // Split the base64 string in data and contentType
    let block = bsdata.split(";");
    // Get the content type of the image
    let contentType = block[0].split(":")[1];// In this case "image/gif"
    // get the real base64 content of the file
    let realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."

    // Convert it to a blob to upload
    let blob = this.b64toBlob(realData, contentType);

    return blob;
  }
  rotateBase64Image(base64ImageSrc) {
    let canvas = document.createElement('canvas');
    let img = new Image();
    img.src = base64ImageSrc;
    canvas.width = img.width;
    canvas.height = img.height;
    let context = canvas.getContext("2d");
    context.translate(img.width, img.height);
    context.rotate(180 * Math.PI / 180);
    context.drawImage(img, 0, 0);
    return canvas.toDataURL();
  }
  readUrl(event: any, type: any) {
      let image: any = new Image();
      let file: File = event.target.files[0];
      let myReader: FileReader = new FileReader();
      let that = this;
      myReader.onloadend = function (loadEvent: any) {
        image.src = loadEvent.target.result;
        that.Avatarcropper.setImage(image);

      };
      myReader.readAsDataURL(file);
      $('#myModal').modal('show');
  }

  checkValidDate() {
    this.profile_errs.date_of_birth = '';
    let result = true;

    if((this.profile_model.year != undefined && 
      this.profile_model.month != undefined && 
      this.profile_model.day != undefined) || 
      (this.profile_model.year == undefined && 
        this.profile_model.month == undefined && 
        this.profile_model.day == undefined)) {
      if(this.profile_model.year != undefined && 
        this.profile_model.month != undefined && 
        this.profile_model.day != undefined) {
          if((this.profile_model.month > 12) || (this.profile_model.month < 1))
          {
            this.profile_errs.date_of_birth += 'Month, ';
            result = false;
          }
          if((this.profile_model.day > 31) || (this.profile_model.day < 1))
          {
            this.profile_errs.date_of_birth += 'Day, ';
            result = false;
          }
          if(this.profile_model.year < 1800)
          {
            this.profile_errs.date_of_birth += 'Year';
            result = false;
          }
        }

    } else {
      this.profile_errs.date_of_birth = 'the date is invalid';
      result = false;
    }

    return result;
    
  }

  doUpdateProfile() {
    
    if(this.profile_model.year != undefined && 
       this.profile_model.month != undefined && 
       this.profile_model.day != undefined) {
      
        this.profile_model['date_of_birth'] = this.profile_model.year + '.' + this.profile_model.month + '.' + this.profile_model.day;
    }

    console.log('profile data : ' + JSON.stringify(this.profile_model));

    this.profile_form_data = new FormData();
    let avatarFi = this.avatarInput.nativeElement;
    if (this.Avatardata.image) {
      console.log('aexist');
      let aimg = this.convertToBlob(this.Avatardata.image);
      this.profile_form_data.append('avatar', aimg);
    }

    for (let key in this.profile_model) {
      this.profile_form_data.append(key, this.profile_model[key]);
    }

    this.authService.updateProfile(this.profile_form_data).subscribe( data => {
      if(data.success == true) {
        this.notification.showNotification('Success', data.msg, 'success');
        this.authService.storeProfileData(data.user);

        this.loadMypagesHeader();
        this.loadProfileData();
        this.headerService.updateAvatar();

        this.router.navigate(['/loto/mypage-account/0']);
      } else {
        this.notification.showNotification('Failed', data.msg, 'error');
      }
    }, err => {
      console.log(err);
    });
  }
  doCancelProfile(formObj) {
    formObj.resetForm();
    setTimeout(() => {
      this.loadProfileData(); // load profile data
      this.Avatardata = {};
    }, 100);
    
  }
  clickedPhotoEdit() {
    $('#fileInput').click();
  }
  /* end profile section */

  /* start email section */
  doUpdateMail(formObj) {
    if(this.email_model.new_email == this.email_model.confirm_new_email) {
      this.email_model.email = this.email_model.new_email;
      console.log('email data : ' + JSON.stringify(this.email_model));

      this.authService.updateEmail(this.email_model).subscribe( data => {
        if(data.success == true) {
          this.userData['email'] = this.email_model.email;
          this.authService.storeProfileData(this.userData);

          this.notification.showNotification('Success', data.msg, 'success');

          this.loadMypagesHeader();
          
          formObj.resetForm();
        } else {
          this.notification.showNotification('Failed', data.msg, 'error');
        }
      }, err => {
        console.log(err);
      });
    } else {
      this.notification.showNotification('Failed', 'Emails are not matched.', 'error');
    }
  }
  doCancelEmail(formObj) {
    formObj.resetForm();
  }
  /* end email section */

  /* start pw section */
  doUpdatePw(formObj) {
    if(this.pw_model.new_password == this.pw_model.confirm_password) {
      this.pw_model.password = this.pw_model.new_password;
      console.log('email data : ' + JSON.stringify(this.pw_model));

      this.authService.updatePassword(this.pw_model).subscribe( data => {
        if(data.success == true) {
          this.userData['origin_password'] = this.pw_model.password;
          this.authService.storeProfileData(this.userData);

          this.notification.showNotification('Success', data.msg, 'success');

          this.loadMypagesHeader();
          
          formObj.resetForm();
        } else {
          this.notification.showNotification('Failed', data.msg, 'error');
        }
      }, err => {
        console.log(err);
      });
    } else {
      this.notification.showNotification('Failed', 'Passwords are not matched.', 'error');
    }
  }
  doCancelPw(formObj) {
    formObj.resetForm();
  }
  /* end pw section */

  /* start 2stepverify section */
  getvf_value(event) {
    switch (event.type) {
      case 1:
        this.step2_verifyflag = event.val;
        this.doUpdate2stepVerification();
        break;
      case 2:
        this.notification_model.login_notification = event.val;
        this.doUpdateNotifications();
        break;
      case 3:
        this.notification_model.operation_notice = event.val;
        this.doUpdateNotifications();
        break;
      case 4:
        this.notification_model.lottery_results = event.val;
        this.doUpdateNotifications();
        break;
      default:
        break;
    }
    console.log('notification : ' + JSON.stringify(this.notification_model));
  }
  
  doUpdateNotifications() {
    this.userData['notifications'] = this.notification_model;
    this.authService.storeProfileData(this.userData);

    this.authService.updateNotifications({notifications: this.notification_model}).subscribe( data => {
      if(data.success == true) {
        this.loadMypagesHeader();
      } else {
        this.notification.showNotification('Failed', data.msg, 'error');
      }
    }, err => {
      console.log(err);
    });

  }

  doSendSMS(formObj) {
    console.log('sms_sender : ' + JSON.stringify(this.sms_sender_model));

    this.authService.sendSmsAndGenerateCode(this.sms_sender_model).subscribe(data => {
      if(data.success == true) {
        this.userData['phonenumber'] = data.phonenumber;
        this.userData['ts_code'] = data.ts_code;
        this.authService.storeProfileData(this.userData);

        this.loadMypagesHeader();

        this.notification.showNotification('Success', data.msg, 'success');
      } else {
        this.notification.showNotification('Failed', data.msg, 'error');
      }
    }, err => {
      console.log(err);
    }); 

    formObj.resetForm();
    this.sms_sender_model = {smscountry: ''};
  }
  doVerifyAuthCode(formObj) {
    console.log('verify_auth_code : ' + JSON.stringify(this.sms_auth_model));

    this.authService.checkSMSCode(this.sms_auth_model).subscribe(data => {
      if(data.success == true) {
        this.userData['phonenumber_verified'] = data.phonenumber_verified;
        this.authService.storeProfileData(this.userData);

        this.loadMypagesHeader();

        this.notification.showNotification('Success', data.msg, 'success');
      } else {
        this.notification.showNotification('Failed', data.msg, 'error');
      }
    }, err => { 
      console.log(err);
    });

    formObj.resetForm();
  }
  doUpdate2stepVerification() {
    console.log('this.step2_verifyflag : ' + this.step2_verifyflag);
    let updateData;
    if(this.step2_verifyflag) {
      updateData = {two_step_verification: this.step2_verifyflag};
    } else {
      updateData = {
        phonenumber: '',
        phonenumber_verified: false,
        two_step_verification: false,
        ts_code: ''
      };
    }
    console.log('update data : ' + JSON.stringify(updateData));
    this.authService.update2StepVerification(updateData).subscribe( data => {
      if(data.success == true) {
        console.log('222');
        if(this.step2_verifyflag) {
          this.userData['two_step_verification'] = this.step2_verifyflag;
        } else {
          this.userData['phonenumber'] = '';
          this.userData['phonenumber_verified'] = false;
          this.userData['two_step_verification'] = false;
          this.userData['ts_code'] = '';
        }
        this.authService.storeProfileData(this.userData);

        this.loadMypagesHeader();
      } else {

      }
    }, err => {
      console.log(err);
    });
  }
  /* end 2stepverify section */

}
