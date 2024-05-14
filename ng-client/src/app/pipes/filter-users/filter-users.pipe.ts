import {Pipe, PipeTransform} from '@angular/core';
import {Users} from "../../store/users/users.model";

@Pipe({
  name: 'filterUsers',
  standalone: true
})
export class FilterUsersPipe implements PipeTransform {

  transform(users: Users[], accessUsers: Users[]): Users[] {
    let filterUsers: Users[] = []
    users.forEach(user => {
      if (accessUsers.findIndex((aUser) => aUser.id === user.id) === -1) {
        filterUsers = [...filterUsers, user]
      }
    })
    return filterUsers;
  }

}
