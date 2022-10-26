import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SpotifyService } from 'src/app/services/spotify.service';
import { CurrentlySong } from './../../../../Models/currently-song';
import { Track } from './../../../../Models/track.model';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss'],
})
export class TrackListComponent implements OnInit {
  public topLimit: number = 7;
  public trackList: { track: Track }[] = [];
  public dataList: [{ track: Track }];
  public currentSong: Track;
  public listOfItems: Track[];
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  @Input() tracks: Observable<{
    href: string;
    total: 0;
    items: [{ track: Track }];
  }>;

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.spotifyService
      .getCurrentlyPlaying()
      .pipe(
        switchMap((song: CurrentlySong) => {
          return this.tracks.pipe(
            switchMap(
              (items: {
                href: string;
                total: 0;
                items: [
                  {
                    track: Track;
                  }
                ];
              }) => {
                this.dataList = items?.items;
                this.dataList.forEach(
                  (data: { track: Track }, index: number) => {
                    if (index < 9) {
                      data.track.uid = '0' + (index + 1);
                    } else {
                      data.track.uid = `${index + 1}`;
                    }
                  }
                );

                this.trackList = this.dataList?.slice(0, this.topLimit);

                this.getCurrentSong(song?.item);
                this.checkIfSongIsPlaying(song);
                this.checkLikedSongs();

                return this.trackList;
              }
            )
          );
        })
      )
      .subscribe();
  }

  public getCurrentSong(value: Track): void {
    this.trackList.forEach((element: { track: Track }) => {
      element.track.id !== value?.id
        ? (element.track = { ...element.track, playing: false })
        : (element.track = { ...element.track, playing: true });
    });
  }

  public checkIfSongIsPlaying(value: CurrentlySong): void {
    this.trackList.forEach((element: { track: Track }) => {
      !value?.is_playing &&
        (element.track = { ...element.track, playing: false });
    });
  }

  public checkLikedSongs(): void {
    let ids: string[] = [];

    this.trackList.forEach((element: { track: Track }) => {
      ids.push(element.track.id);
    });

    this.spotifyService
      .getLikedTrack(ids)
      .subscribe((likedSongs: boolean[]) => {
        for (let index = 0; index < this.trackList.length; ++index) {
          this.trackList[index].track = {
            ...this.trackList[index].track,
            liked: likedSongs[index],
          };
        }
      });
  }

  loadData(event: any): void {
    setTimeout(() => {
      this.topLimit += 4;
      this.trackList = this.dataList?.slice(0, this.topLimit);
      event.target.complete();
      this.checkLikedSongs();

      if (this.trackList.length === this.dataList.length) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll(): void {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
