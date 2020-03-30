import { Component, OnInit } from "@angular/core";
import { SidenavService } from "../../core/services/sidenav.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  constructor(private sidenav: SidenavService) {}

  ngOnInit() {}

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
