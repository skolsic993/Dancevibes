import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Playlist } from 'src/app/Models/playlist.model';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public playlists: Observable<{ items: Playlist[] }>;
  public featuredRawPlaylists: Observable<any>;
  public newReleasedPlaylists: Observable<any>;
  public rawCategories: Observable<any>;

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.playlists = this.spotifyService.getFavoritePlaylists();
    this.featuredRawPlaylists = this.spotifyService.getFeaturedPlaylists();
    this.newReleasedPlaylists = this.spotifyService.getNewReleasedPlaylists();
    this.rawCategories = this.spotifyService.getCategories();
  }
}
