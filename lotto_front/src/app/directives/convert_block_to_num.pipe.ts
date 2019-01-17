import { Pipe } from '@angular/core';

import * as md5 from 'md5';
import crc32 from 'crc/crc32';

@Pipe({
    name: 'convert_block_to_num',
    pure: false
})
export class ConvertBlockToNumPipe {
    transform (values, type) {
        if(values) {
            if(type == 0) { // bit 3
                let total = md5(values.prev_block_hash) + 
                            md5(values.block_height) + 
                            md5(values.block_hash);
                let sub_total = md5(total);
                let crctotal = crc32(sub_total).toString(10);

                return ( parseInt(crctotal) % 9 ) + 1;
            }
            if(type == 1) { // bit 4
                let total = md5(values.prev_block_hash) + 
                            md5(values.block_height) + 
                            md5(values.block_hash);
                let sub_total = md5(total);
                let crctotal = crc32(sub_total).toString(10);

                return ( parseInt(crctotal) % 9 ) + 1;
            }
        }
    }
}