import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';
import { Playlist } from 'src/app/Models/playlist.model';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.page.html',
  styleUrls: ['./playlist-detail.page.scss'],
})
export class PlaylistDetailPage implements OnInit {
  public playlist: Observable<Playlist>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit() {
    this.playlist = this.activatedRoute.params.pipe(
      pluck('id'),
      switchMap((id: string) => {
        return this.spotifyService.getSpecificPlaylist(id);
      })
    );
  }
}
