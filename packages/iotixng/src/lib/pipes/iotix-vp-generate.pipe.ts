import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iotixVpGenerate'
})
export class IotixVpGeneratePipe implements PipeTransform {

  transform(program: any): unknown {
    return JSON.stringify(program, null, 2);
  }

}
