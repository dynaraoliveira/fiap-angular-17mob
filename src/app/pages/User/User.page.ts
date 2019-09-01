import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument , AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../Model/User';

@Component({
  templateUrl: './User.page.html',
  styleUrls: ['./User.page.css']
})

export class UserPage implements OnInit {

  user: User;
	loading: boolean = true;
	title: string = "Novo usuário";

	private collection: AngularFirestoreCollection<User>;
	private doc: AngularFirestoreDocument<User>;
	private item: Observable<User>;
	
	constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private firestore: AngularFirestore
    ) {
      let id = this.route.snapshot.paramMap.get('id');
      this.collection = firestore.collection<User>('users');

      if (this.getUser()) {
        this.doc = firestore.doc<User>('users/'+id);
        this.item = this.doc.valueChanges();
        this.title = "Editar usuário";
      }
    }

	ngOnInit() {
		this.loadUser();
	}

	loadUser(): void {
		if (!this.getUser()) {
			this.user = new User();
			this.loading = false;
		} else {
			this.loading = true;
			this.item.subscribe(user=>{
				this.user = new User();
				this.user.name = user.name;
				this.user.email = user.email;
				this.user.cpf = user.cpf;
				this.user.address = user.address;
				this.user.number = user.number;
				this.user.complement = user.complement;
				this.user.cep = user.cep;
				this.loading = false;
			})
		}
	}

	getUser(): string {
    return this.route.snapshot.paramMap.get('id') || null	;
  }

	onSubmit(): void {
		if (this.getUser()) {
			this.update();
			return
		}

		this.create();
	}

	create(): void {
		this.loading = true;
    let user = this.getUserObject();
    
		this.collection.add(user as User)
		.then(_ =>{
			this.router.navigate(['/']);
		})
		.catch(err=>{
			this.loading = false;
			alert(err);
		})
	}	

	update(): void {
    this.loading = true;
		let user = this.getUserObject();
		
		this.doc.update(user)
		.then(_ =>{
			this.router.navigate(['/']);
		})
		.catch(err=>{
			this.loading = false;
			alert(err);
		})
	}

	getUserObject(): Object {
		return Object.assign({}, this.user);
  }
  
}
