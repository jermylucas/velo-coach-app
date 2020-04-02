import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../services/auth/auth.service";
import { Router } from "@angular/router";

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
  errorMessage: string = null;
  focused = false;

  constructor(private authService: AuthService, private router: Router) {}

  onFocus() {
    this.errorMessage = null;
  }
  onSwitchMode() {
    this.loginMode = !this.loginMode;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const name = form.value.name;

    console.log(form.value);
    if (this.loginMode) {
      this.isLoading = true;
      this.authService
        .login(email, password)
        .then(() => {
          this.isLoading = false;
          this.router.navigate(["/dashboard"]);
        })
        .catch(error => {
          console.log("Received an error: ", error);
          this.handleError(error);
          this.isLoading = false;
        });
      form.reset();
    } else if (!this.loginMode) {
      this.isLoading = true;
      this.authService
        .signup(email, password, name)
        .then(() => {
          this.isLoading = false;
          this.router.navigate(["/dashboard"]);
        })
        .catch(error => {
          console.log("Received an error: ", error);
          this.isLoading = false;
        });
      form.reset();
    }
  }

  private handleError(error) {
    let errorMessage =
      "An unknown error occured. Please try again or contact Jeremy";
    switch (error.code) {
      case "auth/user-not-found":
        errorMessage =
          "We could not find an account with this login. Please try again or create an account";
    }
    switch (error.code) {
      case "auth/too-many-requests":
        errorMessage =
          "Too many requests. Please wait at least 5 minutes or contact admin";
    }
    switch (error.code) {
      case "auth/wrong-password":
        errorMessage = "Password is incorrect. Please try again.";
    }
    switch (error.code) {
      case "auth/email-already-exists":
        errorMessage = "This email already exists. Please login";
    }
    switch (error.code) {
      case "auth/wrong-password":
        errorMessage = "Password is incorrect. Please try again.";
    }
    switch (error.code) {
      case "auth/weak-password":
        errorMessage = "Password must be longer than 6 characters";
    }
    this.errorMessage = errorMessage;
  }
}
