import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, share, shareReplay } from 'rxjs/operators';
import { Playlist } from 'src/app/Models/playlist.model';
import { SpotifyService } from 'src/app/services/spotify.service';
import { User } from './../../../../Models/user';
import { LoadingService } from './../../../../services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public user: Observable<User>;
  public playlists: Observable<{ items: Playlist[] }>;
  public featuredRawPlaylists: Observable<{ items: Playlist[] }>;
  public newReleasedPlaylists: Observable<{ items: Playlist[] }>;
  public rawCategories: Observable<{ items: Playlist[] }>;

  constructor(
    private spotifyService: SpotifyService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.loadingService.loadingOn();

    this.user = this.spotifyService.getUser();
    this.playlists = this.spotifyService.getFavoritePlaylists().pipe(
      finalize(() => this.loadingService.loadingOff()),
      share()
    );

    this.featuredRawPlaylists = this.spotifyService.getFeaturedPlaylists();
    this.newReleasedPlaylists = this.spotifyService
      .getNewReleasedPlaylists()
      .pipe(shareReplay());
    this.rawCategories = this.spotifyService.getCategories();
  }
}
