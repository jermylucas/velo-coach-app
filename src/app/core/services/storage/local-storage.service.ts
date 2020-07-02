import { Injectable } from "@angular/core";
@Injectable()
export class LocalStorageService {
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

  setItemLocally(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  getItemLocally(key: string) {
    return localStorage.getItem(key);
  }
  removeLocalItem(key: string) {
    localStorage.removeItem(key);
  }
}
