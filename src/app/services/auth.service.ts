import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
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
  public isLoggedin: boolean;

  public _currentUser: BehaviorSubject<User | boolean> = new BehaviorSubject(
    null
  );

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
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
          ? this._currentUser.next(session.user)
          : this._currentUser.next(false);
      }
    );
  }

  async loadUser(): Promise<void> {
    const user = this.supabase.auth.user();

    user ? this._currentUser.next(user) : this._currentUser.next(false);
  }

  get currentUser(): Observable<User | boolean> {
    return this._currentUser.asObservable();
  }

  async signIn(): Promise<User> {
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

  public getUser(): User {
    return this.supabase.auth.user();
  }

  public getSession(): Session | null {
    return this.supabase.auth.session();
  }

  public authChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void
  ): any {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  async createNotice(message: string): Promise<void> {
    const toast = await this.toastCtrl.create({ message, duration: 5000 });
    await toast.present();
  }

  createLoader(): Promise<HTMLIonLoadingElement> {
    return this.loadingCtrl.create();
  }
}
