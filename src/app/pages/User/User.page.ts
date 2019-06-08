import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { UsersService } from '../../services/Users.service';
import { NgIf } from '@angular/common';
import { AngularFireModule } from '@angular/fire';

@Component({
    templateUrl: './User.page.html',
    styleUrls: ['./User.page.css']
})

export class UserPage {
    private userId: string = '';
    private data: object = {};
    private loading: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private usersService: UsersService
    ) {}

    ngOnInit() {
        this.userId = this.route.snapshot.paramMap.get('id');
        console.log('userId', this.userId)
        this.getUser(this.userId);
    }

    private getUser(id: string) {
        if (id != null) {
            this.usersService.getById(id).subscribe((data: any) => {
                console.log(data[0].payload.doc.data())
            })
        } else {
            this.usersService.get().subscribe((data: any) => {
                data.forEach(element => {
                    console.log(element.payload.doc.data())
                });
            })
        }
    }

    setValue(event) {
        const { name, value } = event.target;
        this.data = {
            ...this.data,
            [name]: value,
        }

        console.log(this.data);
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