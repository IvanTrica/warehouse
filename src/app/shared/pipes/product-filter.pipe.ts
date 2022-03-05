import { Pipe, PipeTransform } from '@angular/core';
import {IProduct} from "../../model/product";
interface ISearchObject {
  code: string,
  floor: number,
  section: number
}


@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(value: IProduct[], args: ISearchObject): IProduct[] {
    if (args.code === '' && args.floor === 0 && args.section === 0) {
      return value
    }
    return value.filter(i => {
      const code = args.code ?  i.code.includes(args.code.toUpperCase()) : true;
      const floor = args.floor ? i.floor === args.floor : true;
      const section = args.section ? i.section === args.section : true;
      return code && floor && section
    });
}

}
