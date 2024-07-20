import { Pipe, PipeTransform, Type } from '@angular/core';

@Pipe({
  name: 'toString'
})
export class PocketixVpTostringPipe implements PipeTransform {

  transform(type: Type<any>): string {
    return type.name.toString();
  }

}
