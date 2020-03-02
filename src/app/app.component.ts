import {
  Component,
  ViewChild,
  HostListener,
  ChangeDetectionStrategy
} from "@angular/core";
import { SidenavService } from "./services/sidenav.service";
import { MatSidenav } from "@angular/material";
import { BehaviorSubject, Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "velo-coach-app";
  showToggle: string;
  mode: string;
  openSidenav: boolean;
  private screenWidth$ = new BehaviorSubject<number>(window.innerWidth);

  @ViewChild("sidenav", { static: true }) matSidenav: MatSidenav;

  constructor(private sidenavService: SidenavService) {}

  ngOnInit() {
    this.sidenavService.setSidenav(this.matSidenav);

    this.getScreenWidth().subscribe(width => {
      if (width < 640) {
        this.showToggle = "show";
        this.mode = "over";
        this.openSidenav = false;
      } else if (width > 640) {
        this.showToggle = "hide";
        this.mode = "side";
        this.openSidenav = true;
      }
    });
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.screenWidth$.next(event.target.innerWidth);
  }
  getScreenWidth(): Observable<number> {
    return this.screenWidth$.asObservable();
  }
}
