import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pocketixVpGenerate'
})
export class PocketixVpGeneratePipe implements PipeTransform {

  transform(program: any): unknown {
    return JSON.stringify(program, null, 2);
  }

}
