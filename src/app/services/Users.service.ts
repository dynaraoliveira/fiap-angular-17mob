import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import uuid from 'uuid';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(
    private db: AngularFirestore,
    private fireAuth: AngularFireAuth,
  ) { }

  get() {
    return this.db.collection('users').snapshotChanges();
  }

  getById(id: string) {
    return this.db.collection('users', ref => ref.where('id', '==', id)).snapshotChanges();
  }

  create(data) {
    return this.db.collection('users').add({
      id: uuid(),
      ...data,
    })
  }

  update(id: string, data) {
    return this.db.collection('users').doc(id).update(data)
  }

  delete(id: string) {
    return this.db.collection('users').doc(id).delete()
  }

  login(user){
		return this.fireAuth.auth.signInWithEmailAndPassword(user.email, user.password)
	}

	logout(){
		return this.fireAuth.auth.signOut()
	}
}