 import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterstring:string): any {
    // console.log(value+"   "+filterstring)
    if(value.length === 0)
      return value;

    if(filterstring === undefined){
      // console.log("here i am");
      return value;
    }

    if(filterstring.length === 0)
    return value;

    const filteredarray =[];
    for(let item of value){
      if(item.toLowerCase().match(filterstring.toLowerCase()))
        filteredarray.push(item);
    }
    return filteredarray;
  }

}
