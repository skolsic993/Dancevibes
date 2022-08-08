import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import {
  AuthChangeEvent,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Credentials } from '../Models/Credentials';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Profile {
  username: string;
  website: string;
  avatar_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  public _currentUser: BehaviorSubject<User | boolean> = new BehaviorSubject(
    null
  );

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
          ? this._currentUser.next(session.user)
          : this._currentUser.next(false);
      }
    );
  }

  async loadUser(): Promise<void> {
    const user = await this.supabase.auth.user();

    user ? this._currentUser.next(user) : this._currentUser.next(false);
  }

  get currentUser(): Observable<User | boolean> {
    return this._currentUser.asObservable();
  }

  async signUp(credentials: Credentials) {
    return new Promise(async (resolve, reject) => {
      const { user, error } = await this.supabase.auth.signUp(credentials);

      error ? reject(error) : resolve(user);
    });
  }

  async signIn(credentials: { email; password }): Promise<void | User> {
    return new Promise(async (resolve, reject) => {
      const { user, session, error } = await this.supabase.auth.signIn(
        {
          provider: 'spotify',
        },
        {
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

    const headers = new HttpHeaders({
      Authorization:
        'Bearer BQCpQEL5XDEjlqJwk_gg3Q4fvT1P-c_wfEmRyu3og3W2LZLpMilTalUMi-waGcpZ_BEGU7kOV60wS6i-o5_vJcpktARNbihHbufu7XxPGDex3BgpCvJ2Lz52rT2-O6tflcX3ANS2ff177JwzaG7jPU09rBG_46Q63y6JjpQb4DrUqg_uKSwVSgqqLWoVaTt1EKONya4',
    });

    return this.http.get<any>(
      'https://api.spotify.com/v1/users/0pl3kd4bifk0qhy1acm48pd8n/playlist',
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
}
