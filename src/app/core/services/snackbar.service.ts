import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class PopupService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message) {
    this.snackBar.open(message, null, {
      duration: 2000
    });
  }
}
