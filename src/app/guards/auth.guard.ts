import { SupabaseService } from './../services/supabase.service';
import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  canLoad(): Observable<boolean> {
    return this.supabaseService._currentUser.pipe(
      filter((val) => val !== null),
      take(1),
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true;
        } else {
          this.router.navigateByUrl('/intro');
          return false;
        }
      })
    );
  }
}
