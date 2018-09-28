import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appReadMore'
})
export class ReadMorePipe implements PipeTransform {

  transform(value: any, amount: number = 400): any {
    if (value.length > amount) {
        value = value.substr(0, amount) + '...';
    }
    return value;
  }

}
