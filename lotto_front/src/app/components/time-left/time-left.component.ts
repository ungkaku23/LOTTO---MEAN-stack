import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DrawService } from '../../services/draw.service';
import { environment } from '../../../environments/environment';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-time-left',
  templateUrl: './time-left.component.html',
  styleUrls: ['./time-left.component.css']
})
export class TimeLeftComponent implements OnInit {

  @Input() type: any = '';
  @Output() TL_emitter: EventEmitter<any> = new EventEmitter<any>();

  dateString: any = '12:12:12';

  lastDrawDatas: any = [];
  drawConfigs: any = {};

  private socket: any; // The client instance of socket.io

  constructor(private drawService: DrawService) {
    this.socket = io(environment.timeleft_socket_server);
   }

  ngOnInit() {
    console.log('time left init : ' + this.type);

    this.loadNecessaryConfigData();

    let mine = this;
    let tom = 3;
    this.socket.on('added_newdraw', function(data){
      console.log('added new draw!!! - ' + tom);
      mine.loadNecessaryConfigData();
    });

  }

  convertTimestampTOString(atimestamp) {
    let result;

    if(atimestamp > 0) {
      let hours   = Math.floor(atimestamp / 3600);
      let minutes = Math.floor((atimestamp - (hours * 3600)) / 60);
      let seconds = atimestamp - (hours * 3600) - (minutes * 60);

      // round seconds
      seconds = Math.round(seconds * 100) / 100

          result = (hours < 10 ? "0" + hours : hours);
          result += ":" + (minutes < 10 ? "0" + minutes : minutes);
          result += ":" + (seconds  < 10 ? "0" + seconds : seconds);
      
      this.TL_emitter.emit(1);
    } else {
      result = 'Coming Soon';
      this.TL_emitter.emit(0);
      // this.loadNecessaryConfigData();
    }
    return result;
  }

  startInterval() {
    if(this.type == 'bit3') {
      this.doInterval(0);
    } else if(this.type == 'bit4') {
      this.doInterval(1);
    } else if(this.type == 'demo') {
      this.doInterval(1);
    }
  }
  doInterval(type) {
    setInterval(() => {
      let period_timestamp = this.drawConfigs.draw_period * 3600;
      
      let cts_temp = new Date().getTime();
      let current_timestamp = Math.floor(cts_temp / 1000);

      let passed_timestamp = current_timestamp - this.lastDrawDatas[type].data.date;

      this.dateString = this.convertTimestampTOString(period_timestamp - passed_timestamp);
    }, 1000);
  }


  loadNecessaryConfigData() {
    /* this.lastDrawDatas = [
      {date: 1532707200}, // bit3
      {date: 1532710800} // bit4
    ];

    this.drawConfigs = {
      draw_start_time: ['16:00:00', '17:00:00'],
      draw_period: 24
    }; */

    this.drawService.loadLastDrawDatas().subscribe(ldd_data => {
      this.lastDrawDatas = ldd_data.last_draw_data;

      this.drawService.loadDrawConfigs().subscribe(ldc_data => {
        this.drawConfigs = ldc_data.draw_config;

        if(this.lastDrawDatas[0].flag == 0) {
          this.lastDrawDatas[0]['data'] = {date: 0};
        }
        if(this.lastDrawDatas[1].flag == 0) {
          this.lastDrawDatas[1]['data'] = {date: 0};
        }

        console.log('ldd: ' + JSON.stringify(this.lastDrawDatas));
        console.log('ldc: ' + JSON.stringify(this.drawConfigs));

        console.log('0 : ' + this.lastDrawDatas[0].data.date);
        console.log('1 : ' + this.lastDrawDatas[1].data.date);

        this.startInterval();

      }, err => {
        console.log(err);
      });
    }, err => {
      console.log(err);
    });

  }

}
