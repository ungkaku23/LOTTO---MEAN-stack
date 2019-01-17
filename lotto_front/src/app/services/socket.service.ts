import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { PushNotificationsService } from 'ng-push';

import { environment } from '../../environments/environment';
import { LotoAuthService } from './auth.service';

@Injectable()
export class SocketService {

  public push_notify_socket: any; // The client instance of socket.io

  constructor(private authService: LotoAuthService,
              private _pushNotifications: PushNotificationsService) { }

  pushNotification_socketConfiguration() {
    console.log('socket config');

    if(this.authService.loggedIn()) {
      
      this.push_notify_socket = io(environment.lottery_result_socket_server);
      console.log('logged in??');
      let userData = JSON.parse(localStorage.getItem('userData'));
      this.push_notify_socket.emit('register', userData._id);

      this.popupNotification();
    }
  }

  popupNotification() {
    console.log('push notify');

    let mine = this;
            
    this.push_notify_socket.on('update_lottery_result', function(data){
      let userData = JSON.parse(localStorage.getItem('userData'));
      if(userData != null) {
        console.log('wow~~');
        if(userData.notifications.lottery_results) {

          console.log('permission : ' + mine._pushNotifications.isSupported());

          if(!mine._pushNotifications.isSupported()) {
            mine._pushNotifications.requestPermission();
            mine.showPushNotification(data);
          } else {
            mine.showPushNotification(data);
          }
                        
        }
      }
    });
  }

  showPushNotification(data) {
    console.log('~~~~~~~~~~~~socket data : ' + data);
                        
    let tag = '';
    if(data == 0)
      tag = 'Bit Number 3';
    if(data == 1) 
      tag = 'Bit Number 4';
                        
      this._pushNotifications.create(
            'LOTO Notification - ' + tag,
            {body: 'The lottery results happened, please click this to go to the Lottery result',
            icon: 'assets/imgs/banner_big.png'}
      )
      .subscribe(res => {
        if (res.event.type === 'click') {
            // You can do anything else here
            window.open('/loto/mypage-lottery-results', '_blank');
            // mine.router.navigate(['/loto/mypage-lottery-results']);
            res.notification.close();
        }
      }
    );
  }

}
