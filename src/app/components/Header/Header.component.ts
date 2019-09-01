import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../../services/Users.service';

@Component({
    selector: 'header-component',
    templateUrl: './Header.component.html',
    styleUrls: ['./Header.component.css']
})

export class HeaderComponent {

  constructor(
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit() { }

  logout(){
    this.usersService.logout()
    .then(() => this.router.navigate(['login']))
    .catch((err) => alert('Não foi possível completar a ação'));
	}

	addUser(){
		this.router.navigate(['user']);
  }
  
  goToList(){
    this.router.navigate(['/']);
  }
}