import { Component } from '@angular/core'

import { UsersService } from '../../services/Users.service';

@Component({
    templateUrl: './User.page.html',
    styleUrls: ['./User.page.css']
})

export class UserPage {
    constructor(
        private usersService: UsersService
    ) {}

    private loading: boolean = false;

    createUser() {
        this.loading = true;
        this.usersService.create({
            name: 'dynara',
            email: 'dynara.oliveira@gmail.com',
            age: 29,
            phone: "+5511985391761"
        })
        .then (() => this.loading = false)
        .catch ((err) => this.loading = false);

    }
}