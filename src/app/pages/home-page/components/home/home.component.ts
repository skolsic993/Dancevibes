import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Playlist } from 'src/app/Models/playlist.model';
import { SpotifyService } from 'src/app/services/spotify.service';
import { User } from './../../../../Models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public user: Observable<User>;
  public playlists: Observable<{ items: Playlist[] }>;
  public featuredRawPlaylists: Observable<any>;
  public newReleasedPlaylists: Observable<any>;
  public rawCategories: Observable<any>;

  constructor(private spotifyService: SpotifyService, private router: Router) {}

  ngOnInit() {
    this.user = this.spotifyService.getUser();
    this.playlists = this.spotifyService.getFavoritePlaylists();
    this.featuredRawPlaylists = this.spotifyService.getFeaturedPlaylists();
    this.newReleasedPlaylists = this.spotifyService
      .getNewReleasedPlaylists()
      .pipe(shareReplay(1));
    this.rawCategories = this.spotifyService.getCategories();
  }
}
