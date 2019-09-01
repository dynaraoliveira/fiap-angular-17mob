import { Component } from '@angular/core'
import { Router } from '@angular/router';
import { User } from '../Model/User';
import { UsersService } from '../../services/Users.service';

import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { SortPipe } from 'src/app/pipes/sort.pipe';

@Component({
    templateUrl: './UserList.page.html',
    styleUrls: ['./UserList.page.css']
})

export class UserListPage {
  users: Array<User> = [];
  loading: boolean = false;
  filterBy: string = "";
  
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
        user.id = doc.id
				user.name = result.name;
				user.email = result.email;
				user.cpf = result.cpf;
				user.address = result.address;
				user.number = result.number;
				user.complement = result.complement;
				user.cep = result.cep;
        this.loading = false;
        
        this.users.push(user)
      });
    });
  }

  delete(id: string) {
    this.loading = true;
    
    this.usersService.delete(id)
    .then(_ =>{
			this.router.navigate(['/']);
		})
		.catch(err=>{
			this.loading = false;
			alert(err);
    })

  }

  edit(id: string){
    this.router.navigate(['user/' + id])
  }

  setFilterBy(value){
    this.filterBy = value
  }
}
