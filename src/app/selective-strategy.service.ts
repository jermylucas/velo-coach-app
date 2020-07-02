import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectiveStrategy implements PreloadingStrategy {
  preload(route: Route, load): Observable<any> {
    // Checks if route has data property and if it's set to true, then it will return the load function which preloads the module
    if (route.data && route.data['preload']) {
      return load();
    }
    // If not either of those, then it will return the observable of null (no preload)
    return of(null);
  }
}
