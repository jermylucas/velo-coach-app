import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { SideNavComponent } from './core/components/side-nav/side-nav.component';

// State
import { NgxsModule } from '@ngxs/store';
import { AppState } from './app.state';
import { SidenavService } from './core/services/sidenav.service';
import { LocalStorageService } from './core/services/storage/local-storage.service';
import { AngularFireModule } from '@angular/fire';
import { AuthComponent } from './core/components/auth/auth.component';
import { UserState } from './core/components/auth/user.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotFoundComponent,
    SideNavComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    NgxsModule.forRoot([AppState, UserState], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    SidenavService,
    LocalStorageService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptorService,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
