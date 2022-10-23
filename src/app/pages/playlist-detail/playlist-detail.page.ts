import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, pluck, shareReplay, switchMap } from 'rxjs/operators';
import { Playlist } from 'src/app/Models/playlist.model';
import { Track } from 'src/app/Models/track.model';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.page.html',
  styleUrls: ['./playlist-detail.page.scss'],
})
export class PlaylistDetailPage implements OnInit {
  public tracks: Observable<{
    href: string;
    total: 0;
    items: [{ track: Track }];
  }>;
  public playlist: Observable<Playlist>;
  public heroSectionData: Observable<{
    name: string;
    description: string;
    image: string;
  }>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit() {
    this.playlist = this.activatedRoute.params.pipe(
      pluck('id'),
      switchMap((id: string) => {
        return this.spotifyService.getSpecificPlaylist(id);
      }),
      shareReplay()
    );

    this.getDataForHeroSection();
    this.getDataForTrackList();
  }

  public getDataForHeroSection(): void {
    this.heroSectionData = this.playlist.pipe(
      map((playlist: Playlist) => {
        return {
          name: playlist.name,
          description: playlist.description,
          image: playlist.images[0]?.url,
        };
      })
    );
  }

  public getDataForTrackList(): void {
    this.tracks = this.playlist.pipe(
      map((playlist: Playlist) => {
        return {
          tracks: playlist.tracks,
        };
      }),
      pluck('tracks')
    );
  }
}
