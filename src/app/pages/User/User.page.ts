import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { UsersService } from '../../services/Users.service';

@Component({
  templateUrl: './User.page.html',
  styleUrls: ['./User.page.css']
})

export class UserPage {
  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  private userId: string = '';
  private loading: boolean = false;
  private idDoc: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) this.getUser(this.userId);
  }

  private getUser(id: string) {
    this.usersService.getById(id).subscribe((data: any) => {
      const { doc } = data[0].payload
      const result = doc.data();
      
      this.idDoc = doc.id;

      Object.keys(result)
      .filter(item => item !== 'id')
      .forEach((item) => {
        this.userForm.controls[item].setValue(result[item]);
      })
    })

  }

  onSubmit() {
    this.loading = true;

    if (!this.userId) {

      this.usersService.create(this.userForm.value)
      .then(() => this.router.navigate(['/']))
      .catch((err) => this.loading = false);

    } else {

      this.usersService.update(
        this.idDoc,
        this.userForm.value,
      )
      .then(() => this.router.navigate(['/']))
      .catch((err) => this.loading = false);

    }

  }
}