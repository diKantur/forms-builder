import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'text',
})
export class TextPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return JSON.stringify(value).replace(/[{}"]/g, '').replace(/,/g, ';\n');
  }
}
