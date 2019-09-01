import { Pipe, PipeTransform } from '@angular/core';
import { User } from './../pages/Model/User';

@Pipe({
  name: 'filter',
})

export class FilterPipe implements PipeTransform {
  transform(items: Array<User>, filterBy: string): Array<User> {
    let list = []
    items.map(item => item.name.startsWith(filterBy) ? list.push(item) : null);
    if (list.length > 0) {
        return list
    } else {
        return items
    }
  }
}