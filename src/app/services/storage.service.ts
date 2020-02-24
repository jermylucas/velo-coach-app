import { Injectable } from "@angular/core";
@Injectable()
export class StorageService {
  constructor() {}

  getItem(key: string) {
    return sessionStorage.getItem(key);
  }
  removeItem(key: string) {
    sessionStorage.removeItem(key);
  }
  setItem(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }
  clearAll() {
    sessionStorage.clear();
  }
}
