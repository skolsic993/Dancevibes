import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  AuthChangeEvent,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;
  public signedIn$ = new BehaviorSubject<null | boolean>(null);
  public _currentUser: BehaviorSubject<User | boolean> = new BehaviorSubject(
    null
  );

  get currentUser(): Observable<User | boolean> {
    return this._currentUser.asObservable();
  }

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
      {
        autoRefreshToken: true,
        persistSession: true,
      }
    );

    this.loadUser();

    this.supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session) => {
        event == 'SIGNED_IN'
          ? this.signedIn$.next(true)
          : this.signedIn$.next(false);
      }
    );
  }

  signin(): Promise<User> {
    this.signedIn$.next(true);
    return new Promise(async (resolve, reject) => {
      const { user, session, error } = await this.supabase.auth.signIn(
        {
          provider: 'spotify',
        },
        {
          scopes: environment.scopes,
          redirectTo: 'http://localhost:8100/home?refresh=true',
        }
      );

      error ? reject(error) : resolve(user);
    });
  }

  async signOut(): Promise<void> {
    await this.supabase.auth.signOut();

    this.supabase.getSubscriptions().map((sup) => {
      this.supabase.removeSubscription(sup);
    });

    this.router.navigateByUrl('/');
  }

  getUser() {
    const user = this.supabase.auth.user();

    const access_token = JSON.parse(localStorage.getItem('supabase.auth.token'))
      ?.currentSession?.provider_token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${access_token}`,
    });

    return this.http.get<any>(
      `https://api.spotify.com/v1/users/${user?.user_metadata?.sub}/playlists`,
      {
        headers,
      }
    );
  }

  async createNotice(message: string): Promise<void> {
    const toast = await this.toastCtrl.create({ message, duration: 5000 });
    await toast.present();
  }

  createLoader(): Promise<HTMLIonLoadingElement> {
    return this.loadingCtrl.create();
  }

  async loadUser(): Promise<void> {
    const user = this.supabase.auth.user();

    user ? this._currentUser.next(user) : this._currentUser.next(false);
  }
}
