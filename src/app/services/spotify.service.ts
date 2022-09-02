import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Playlist } from '../Models/playlist.model';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  public getPlaylists(): Observable<{ items: Playlist[] }> {
    const user = this.authService.getUser();

    const access_token = JSON.parse(localStorage.getItem('supabase.auth.token'))
      ?.currentSession?.provider_token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${access_token}`,
    });

    return this.http.get<{ items: Playlist[] }>(
      `https://api.spotify.com/v1/users/${user?.user_metadata?.sub}/playlists`,
      {
        headers,
      }
    );
  }
}
