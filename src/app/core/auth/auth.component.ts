import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"]
})
export class AuthComponent {
  email: string;
  password: string;
  loginMode: boolean = true;
  isLoading: boolean;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (this.loginMode) {
      this.isLoading = true;
      this.authService
        .login(form.value.email, form.value.password)
        .then(() => {
          this.isLoading = false;
        })
        .catch(() => {
          console.log("Something went wrong:");
        });
      form.reset();
    } else if (!this.loginMode) {
      this.isLoading = true;
      this.authService
        .login(form.value.email, form.value.password)
        .then(() => {
          this.isLoading = false;
        })
        .catch(() => {
          console.log("Something went wrong:");
        });
      form.reset();
    }
  }
}
