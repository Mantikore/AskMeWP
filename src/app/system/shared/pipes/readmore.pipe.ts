import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appReadMore'
})
export class ReadMorePipe implements PipeTransform {

  transform(value: string, amount: number = 400): string {
    if (value.length > amount) {
        value = value.substr(0, amount) + '...';
    }
    return value;
  }

}
