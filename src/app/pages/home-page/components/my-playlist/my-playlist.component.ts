import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck, switchMap, tap } from 'rxjs/operators';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Playlist } from '../../../../Models/playlist.model';

@Component({
  selector: 'app-my-playlist',
  templateUrl: './my-playlist.component.html',
  styleUrls: ['./my-playlist.component.scss'],
})
export class MyPlaylistComponent implements OnInit {
  public playlists: Observable<Playlist[]>;
  public releasedPlaylists: Observable<Playlist[]>;

  @Input() rawPlaylists: Observable<{ items: Playlist[] }>;
  @Input() newReleasedPlaylists: Observable<{ items: Playlist[] }>;

  constructor(private router: Router, private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.playlists = this.spotifyService.refreshPlaylist$.pipe(
      switchMap((_) => this.rawPlaylists),
      tap((playlists: { items: Playlist[] }) =>
        playlists.items.map((playlist: Playlist) => {
          playlist = { ...playlist, liked: true };
        })
      ),
      pluck('items')
    );

    this.releasedPlaylists = this.newReleasedPlaylists.pipe(
      pluck('albums'),
      pluck('items')
    );

    this.rawPlaylists.subscribe((playlists: { items: Playlist[] }) => {
      this.spotifyService.likedPlaylists$.next(playlists.items);
    });
  }

  public onSelect(item: Playlist) {
    this.router.navigate([`/playlists/${item.id}`]);
  }
}
