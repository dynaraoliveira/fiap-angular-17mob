import { Component } from '@angular/core'
import { Router } from '@angular/router';

import { UsersService } from '../../services/Users.service';

@Component({
    templateUrl: './UserList.page.html',
    styleUrls: ['./UserList.page.css']
})

export class UserListPage {
  private users: Array<User> = [];
  private loading: boolean = false;

  constructor(
    private usersService: UsersService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getUsers()
  }

  private getUsers() {
    this.usersService.get().subscribe((data: any) => {
      data.forEach(item => {
        const { doc } = item.payload
        const result = doc.data();
        
        let user = new User();
        user.idDoc = doc.id
        user.id = result.id
        user.name = result.name
        user.email = result.email
        user.age = result.age
        user.phone = result.phone
        console.log(user)
        this.users.push(user)
      });
    });
  }

  private deleteUser(idDoc: string) {
    this.loading = true;
    
    this.usersService.delete(idDoc)
    .then(() => this.loading = false)
    .catch((err) => this.loading = false);
  }
}

export class User {
  idDoc: String
  id: String
  name: string
  email: string
  age: number
  phone: string
}