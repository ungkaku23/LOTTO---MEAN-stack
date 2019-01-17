import { Component, OnInit } from '@angular/core';

import * as md5 from 'md5';
import crc32 from 'crc/crc32';

@Component({
  selector: 'app-check-fair-play',
  templateUrl: './check-fair-play.component.html',
  styleUrls: ['./check-fair-play.component.css']
})
export class CheckFairPlayComponent implements OnInit {

  bit3_model: any = {prev_block_hash: '', block_height: '', block_hash: ''};
  bit4_model: any = {prev_block_hash: '', block_height: '', block_hash: ''};

  constructor() { }

  ngOnInit() {



  }

}
