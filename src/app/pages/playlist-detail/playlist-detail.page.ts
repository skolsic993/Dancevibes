import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {
  delay,
  first,
  map,
  pluck,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Playlist } from 'src/app/Models/playlist.model';
import { Track } from 'src/app/Models/track.model';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.page.html',
  styleUrls: ['./playlist-detail.page.scss'],
})
export class PlaylistDetailPage implements OnInit {
  public id: string;
  public unknownPlaylistId: string;
  public alreadyLiked: boolean;
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
        this.unknownPlaylistId = id;
        return this.spotifyService.getSpecificPlaylist(id);
      }),
      shareReplay()
    );

    this.getFollowedPlaylists();
    this.getUnfollowedPlaylists();

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

  public likePlaylist(liked: boolean): void {
    if (liked) {
      this.spotifyService
        .unfollowPlaylist(this.id)
        .pipe(
          tap(() => this.spotifyService.refreshPlaylist$.next(true)),
          delay(100)
        )
        .subscribe();
      this.alreadyLiked = false;
    } else {
      this.spotifyService
        .followPlaylist(this.unknownPlaylistId)
        .pipe(
          tap(() => this.spotifyService.refreshPlaylist$.next(true)),
          delay(100)
        )
        .subscribe();
      this.alreadyLiked = true;
    }
  }

  public getFollowedPlaylists(): void {
    this.playlist
      .pipe(
        first(),
        switchMap((selected: Playlist) => {
          return this.spotifyService.likedPlaylists$.pipe(
            switchMap((playlists: Playlist[]) => {
              return playlists.filter(
                (playlist: Playlist) => playlist.id === selected.id
              );
            })
          );
        })
      )
      .subscribe((playlist: Playlist) => {
        this.alreadyLiked = true;
        this.id = playlist?.id;
      });
  }

  public getUnfollowedPlaylists(): void {
    this.playlist
      .pipe(
        first(),
        switchMap((selected: Playlist) => {
          return this.spotifyService.likedPlaylists$.pipe(
            switchMap((playlists: Playlist[]) => {
              return playlists.filter(
                (playlist: Playlist) => playlist.id != selected.id
              );
            })
          );
        })
      )
      .subscribe((playlist: Playlist) => {
        this.unknownPlaylistId = playlist?.id;
      });
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
