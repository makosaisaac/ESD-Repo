import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'moment'
})
export class MomenttPipe implements PipeTransform {

  transform(value: Date | any, ...args: unknown[]): unknown {
    return moment(value).calendar();
  }

}
