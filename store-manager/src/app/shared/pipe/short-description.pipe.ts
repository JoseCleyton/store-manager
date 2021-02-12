import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDescription',
})
export class ShortDescriptionPipe implements PipeTransform {
  transform(value: string, ...args: any[]): string {
    return value.slice(0, 3).concat('...');
  }
}
