import { Pipe, PipeTransform } from '@angular/core';
import { PocketixVPPreferredPosition } from '../model/pocketix-vp-language.model';

@Pipe({
  name: 'testPos'
})
export class PocketixVpTestposPipe implements PipeTransform {

  transform(i: number, length: number, preferred: boolean, list?: PocketixVPPreferredPosition[]): boolean {
    if(!list) {
      return true;
    } else {
      for(let j = 0; j < list.length; j++) {
        if(typeof list[j] === "number") {
          if(i === list[j]) {
            return preferred;
          }
        } else {
          if(i === 0 && list[j] === "first") {
            return preferred;
          } else if(i > 0 && i < length-1 && list[j] === "middle") {
            return preferred;
          } else if(i === length-1 && list[j] === "last") {
            return preferred;
          }
        }
      }
    }

    return !preferred;
  }

}
