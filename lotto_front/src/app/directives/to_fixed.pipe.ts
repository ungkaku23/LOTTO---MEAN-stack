import { Pipe } from '@angular/core';

@Pipe({
    name: 'to_fixed',
    pure: false
})
export class ToFixedPipe {
    transform (values, param) {
        if(values) {
            let dstr = values.toString();
            if(dstr.indexOf('.') > -1) {
                if(dstr.split('.')[1].length < param)
                    return values;

                return values.toFixed(param);
            } else {
                return values;
            }
        } else {
            return values;
        }
    }
}