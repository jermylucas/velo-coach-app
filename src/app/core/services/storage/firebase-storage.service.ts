import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class FirebaseStorageService {
  constructor(private storage: AngularFireStorage) {}

  // Deletes Image from Storage
  onDeleteImage(imageUrl: string) {
    this.storage.storage.refFromURL(imageUrl).delete();
    console.log('Deleted?');
  }
}
