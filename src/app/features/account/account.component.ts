import { Component, OnInit } from "@angular/core";
import { ProfileService } from "src/app/core/services/profile.service";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"],
})
export class AccountComponent implements OnInit {
  profileSub;
  activeUser;
  editMode: boolean = false;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileSub = this.profileService.getCurrentUser().subscribe((res) => {
      this.activeUser = res;
    });
  }

  changeMode() {
    this.editMode = !this.editMode;
  }
}
