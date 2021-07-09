import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select } from '@ngxs/store';
import { interval, Observable, Subscription } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { SidenavService } from '../../services/sidenav.service';
import { User, UserState } from '../auth/user.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Select(UserState.user) user$: Observable<User>;
  activeUser: string;
  today: Date;
  clock$: Observable<Date>;
  // userSub: Subscription;

  constructor(private sidenav: SidenavService) {
    // this.userSub = this.authService.user.subscribe((user) => {
    //   if (user) {
    //     this.activeUser = user.displayName;
    //   } else if (!user) {
    //     this.activeUser = null;
    //   }
    // });
  }

  ngOnInit() {
    this.today = new Date();
    // if (!this.mobile) {
    this.clock$ = interval(1000).pipe(
      map((tick) => new Date()),
      // tap(() => console.warn('CLOCK')),
      share()
    );

    this.user$.subscribe((res) => {
      if (res) {
        this.activeUser = res.displayName!;
      } else {
        this.activeUser = '';
      }
    });
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  ngOnDestroy() {
    // this.userSub.unsubscribe();
  }
}
