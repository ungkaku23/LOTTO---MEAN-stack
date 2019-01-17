import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable()
export class HeaderService {

  @Output() avatarHandle: EventEmitter<any> = new EventEmitter();

  constructor() { }

  updateAvatar() {
    this.avatarHandle.emit('');
  }

}
