import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Track } from 'src/app/Models/track.model';
import { AuthService } from 'src/app/services/auth.service';
import { CurrentlySong } from '../Models/currently-song';
import { Playlist } from '../Models/playlist.model';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  public song$: BehaviorSubject<string> = new BehaviorSubject('');
  public refreshPlaylist$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(private http: HttpClient, private authService: AuthService) {}

  private baseUrl = 'https://api.spotify.com/v1';
  private user = this.authService.getUser();

  private access_token = JSON.parse(localStorage.getItem('supabase.auth.token'))
    ?.currentSession?.provider_token;

  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.access_token}`,
  });

  public playSong(trackItem: Track): Observable<void> {
    https: console.log(trackItem);
    const headers = this.headers;
    const body = {
      uris: [trackItem?.uri],
    };

    return this.http.put<void>(`${this.baseUrl}/me/player/play`, body, {
      headers,
    });
  }

  public pauseSong(uri: string): Observable<void> {
    const headers = this.headers;
    const body = {
      uris: [uri],
      offset: {
        position: 5,
      },
      position_ms: 0,
    };

    return this.http.put<void>(`${this.baseUrl}/me/player/pause`, body, {
      headers,
    });
  }

  public nextSong(): Observable<any> {
    const headers = this.headers;

    return this.http.post<any>(`${this.baseUrl}/me/player/next`, {
      headers,
    });
  }

  public addToQueue(): Observable<any> {
    const headers = this.headers;

    return this.http.get<any>(`${this.baseUrl}/me/player/queue`, {
      headers,
    });
  }

  public getCurrentlyPlaying(): Observable<CurrentlySong> {
    const headers = this.headers;

    return this.http.get<CurrentlySong>(
      `${this.baseUrl}/me/player/currently-playing`,
      {
        headers,
      }
    );
  }

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

  public getUser(): Observable<any> {
    const headers = this.headers;

    return this.http.get<any>(`${this.baseUrl}/me`, {
      headers,
    });
  }

  public createPlaylist(
    createPlaylistForm: {
      name: string;
    },
    id: string
  ): Observable<Playlist> {
    const headers = this.headers;
    const body = {
      name: createPlaylistForm.name,
      description: '',
      public: false,
    };

    return this.http.post<Playlist>(
      `${this.baseUrl}/users/${id}/playlists`,
      body,
      {
        headers,
      }
    );
  }

  public getLikedTrack(id: string): any {
    const headers = this.headers;

    return this.http.get(
      `${this.baseUrl}/me/tracks/contains?ids=5Sm1X46tna50RstHZvw072`,
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

  public addItemsToThePlaylist(id: string, track: Track): Observable<void> {
    const headers = this.headers;
    const body = {
      uris: [track?.uri],
    };

    return this.http.post<void>(
      `${this.baseUrl}/playlists/${id}/tracks`,
      body,
      {
        headers,
      }
    );
  }

  public getUsersPlaylists(user) {
    const headers = this.headers;

    return this.http.get<Playlist>(
      `${this.baseUrl}/users/${user.id}/playlists`,
      {
        headers,
      }
    );
  }

  public getSpecificTrack(id: string): Observable<Track> {
    const headers = this.headers;

    return this.http.get<Track>(`${this.baseUrl}/tracks/${id}`, {
      headers,
    });
  }
}
