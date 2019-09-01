import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UsersService } from '../../services/Users.service';

@Component({
  templateUrl: './Login.page.html',
  styleUrls: ['./Login.page.css']
})

export class LoginPage {
  
  loading: boolean = false;
  user: any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.user = {
			email: "",
			password: ""
		}
  }

  onSubmit() {
    this.loading = true;

		this.usersService.login(this.user)
    
    .then(user=>{
			this.router.navigate(['/'])
      this.loading = true
		})
    
    .catch(err=>{
			this.loading = false
			alert(err.message)
    })
    
  }
}