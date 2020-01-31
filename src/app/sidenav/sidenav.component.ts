import { Component, ViewChild, OnInit } from "@angular/core";
import { MatSidenav } from "@angular/material";
import { SidenavService } from "./sidenav.service";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"]
})
export class SidenavComponent implements OnInit {
  @ViewChild("sidenav", { static: true }) public sidenav: MatSidenav;

  panelOpenState: boolean = false;

  closePanel() {
    this.panelOpenState = false;
  }

  constructor(private sidenavService: SidenavService) {}

  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }
}
