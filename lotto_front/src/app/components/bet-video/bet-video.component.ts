import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-bet-video',
  templateUrl: './bet-video.component.html',
  styleUrls: ['./bet-video.component.css']
})
export class BetVideoComponent implements OnInit {

  videotype: any;
  limitSize: any;
  
  animateHandle: any;
  gotArr: any = [];
  tempArr: any = [];

  dialogSpan = {};

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    
    this.activatedRoute.params.subscribe(param => {
      if(param['type'] != undefined)
      {
        console.log('type : ' + param['type']);
        this.videotype = param['type'];
        if(this.videotype == 'bit3')
        {
          this.limitSize = 3;
          this.getRandomNumbers();
        }
        if((this.videotype == 'bit4') || (this.videotype == 'demo'))
        {
          this.limitSize = 4;
          this.getRandomNumbers();
        }
        
      }
    });
  }

  getRandomNumbers() {

      var arr = []
      while(arr.length < this.limitSize){
          var randomnumber = Math.floor(Math.random()*9) + 1;
          if(arr.indexOf(randomnumber) > -1) continue;
          arr[arr.length] = randomnumber;
      }

      this.tempArr = arr;

      this.startAnimation(arr);
      console.log('rarr : ' + arr);
  }

  startAnimation(arr)
  {
    let frame = 0;
    
      this.animateHandle = setInterval(() => {
        if(this.gotArr.length < this.limitSize)
        {
          frame++;
          if(frame % 2 == 0)
          {
            $('#cardDialog').modal('hide');
            this.gotArr.push(arr[(frame / 2) - 1]);
          }
          if(frame % 2 == 1)
          {
            this.dialogSpan['style'] = (frame - 1) / 2;
            this.dialogSpan['num'] = arr[(frame - 1) / 2];
            $('#cardDialog').modal('show');
            console.log('data : ' + arr[(frame - 1) / 2]);
          }
        }
        else {
          console.log('ender');
          this.stopAnimation();
        }
      },2000);
    
  }
  stopAnimation()
  {
    clearInterval(this.animateHandle);
    $('#bet_ResultDialog').modal('show');
  }
  toSkip()
  {
    this.stopAnimation();
    this.gotArr = this.tempArr;
  }

  closeResultDialog()
  {
    $('#bet_ResultDialog').modal('hide');
  }

}
