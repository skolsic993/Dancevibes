import { Component, Input, OnInit } from '@angular/core';
import { Playlist } from 'src/app/Models/playlist.model';
import { Track } from 'src/app/Models/track.model';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-owner-playlist-items',
  templateUrl: './owner-playlist-items.component.html',
  styleUrls: ['./owner-playlist-items.component.scss'],
})
export class OwnerPlaylistItemsComponent implements OnInit {
  @Input() track: Track;
  @Input() playlists: Playlist[];

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit() {
    console.log(this.track);
  }

  public addSongToPlaylist(playlist: Playlist): void {
    this.spotifyService
      .addItemsToThePlaylist(playlist.id, this.track)
      .subscribe();
  }
}
