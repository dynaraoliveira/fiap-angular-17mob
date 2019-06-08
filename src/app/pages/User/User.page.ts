import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { UsersService } from '../../services/Users.service';

@Component({
    templateUrl: './User.page.html',
    styleUrls: ['./User.page.css']
})

export class UserPage {
    private loading: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private usersService: UsersService
    ) {}

    ngOnInit() {
        console.log(this.route.snapshot.paramMap.get('id'));
    }

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