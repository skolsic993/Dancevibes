import { Component, Input, OnInit } from '@angular/core';
import { Playlist } from 'src/app/Models/playlist.model';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-recommended-playlist',
  templateUrl: './recommended-playlist.component.html',
  styleUrls: ['./recommended-playlist.component.scss'],
})
export class RecommendedPlaylistComponent implements OnInit {
  @Input() newReleasedPlaylists: Playlist[];

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit() {}

  public getPlaylist() {
    console.log('GET ALBUMS');
  }
}
