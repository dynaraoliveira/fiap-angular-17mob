import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

import uuid from 'uuid';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(
    private http: HttpClient,
    private db: AngularFirestore
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

  update(idDoc: string, data) {
    return this.db.collection('users').doc(idDoc).update(data)
  }

  delete(idDoc: string) {
    return this.db.collection('users').doc(idDoc).delete()
  }
}