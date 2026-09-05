import { Pipe, PipeTransform, Type } from '@angular/core';

@Pipe({
    name: 'toString',
    standalone: false
})
export class IotixVpTostringPipe implements PipeTransform {

  transform(type: Type<any>): string {
    return type.name.toString();
  }

}
