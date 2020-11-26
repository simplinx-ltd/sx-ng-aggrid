import { Pipe, PipeTransform } from '@angular/core';
import * as moment_ from 'moment';
const moment = moment_;

@Pipe({ name: 'dateFormat' })
export class DateFormatPipe implements PipeTransform {
    transform(value: any, exponent: string): any {
        return moment(value).isValid() ? moment(value).format('YYYY/MM/DD HH:mm:ss') : '-';
    }
}