import { Pipe } from '@angular/core';

@Pipe({
    name: 'double_dot_time_format',
    pure: false
})
export class DoubleDotTimeFormatPipe {

    modifyTime(time) {
        if(time.toString().length == 1) {
            return '0' + time;
        }
        return time;
    }

    transform (values) {
        if(values) {

            let date = new Date(values);
            return this.modifyTime(date.getUTCHours()) + ':' +
                   this.modifyTime(date.getUTCMinutes()) + ':' +
                   this.modifyTime(date.getUTCSeconds());
            
        }
    }
}