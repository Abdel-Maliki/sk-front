import {Pipe, PipeTransform} from '@angular/core';

/**
 * @author abdel-maliki
 * Date : 17/09/2020
 */

@Pipe({name: 'req'})
export class Riqueredpipe implements PipeTransform {
  transform(value: string): string {
    return value + '*';
  }
}
