import { Pipe } from '@angular/core';

@Pipe({
    name: 'dot_date_format',
    pure: false
})
export class DotDateFormatPipe {
    transform (values) {
        if(values) {
            let date = new Date(values*1000);

            var mm = date.getMonth() + 1; // getMonth() is zero-based
            var dd = date.getDate();

            return [date.getFullYear(),
                    (mm>9 ? '' : '0') + mm,
                    (dd>9 ? '' : '0') + dd
                ].join('.');
        }
    }
}