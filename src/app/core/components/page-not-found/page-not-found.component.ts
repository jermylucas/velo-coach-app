import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div style=" margin-left: 20px">
      <h1 style="font-size: 35px;">404 Error: Page not found"</h1>
      <a routerLink="/dashboard">
        Click here to go to dashboard or to sign in</a
      >
    </div>
  `,
})
export class PageNotFoundComponent {}
