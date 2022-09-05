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

  private baseUrl = 'https://api.spotify.com/v1';
  private user = this.authService.getUser();

  private access_token = JSON.parse(localStorage.getItem('supabase.auth.token'))
    ?.currentSession?.provider_token;

  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.access_token}`,
  });

  public getFavoritePlaylists(): Observable<{ items: Playlist[] }> {
    const headers = this.headers;

    return this.http.get<{ items: Playlist[] }>(
      `${this.baseUrl}/users/${this.user?.user_metadata?.sub}/playlists`,
      {
        headers,
      }
    );
  }

  public getFeaturedPlaylists(): Observable<{ items: Playlist[] }> {
    const headers = this.headers;

    return this.http.get<{ items: Playlist[] }>(
      `${this.baseUrl}/browse/featured-playlists`,
      {
        headers,
      }
    );
  }

  public getNewReleasedPlaylists(): Observable<{ items: Playlist[] }> {
    const headers = this.headers;

    return this.http.get<{ items: Playlist[] }>(
      `${this.baseUrl}/browse/new-releases`,
      {
        headers,
      }
    );
  }

  public getCategories(): Observable<{ items: Playlist[] }> {
    const headers = this.headers;

    return this.http.get<{ items: Playlist[] }>(
      `${this.baseUrl}/browse/categories`,
      {
        headers,
      }
    );
  }

  public getSpecificPlaylist(id: string): Observable<Playlist> {
    const headers = this.headers;

    return this.http.get<Playlist>(`${this.baseUrl}/playlists/${id}`, {
      headers,
    });
  }
}
