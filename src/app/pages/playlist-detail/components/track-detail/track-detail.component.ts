import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';
import { Track } from 'src/app/Models/track.model';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-track-detail',
  templateUrl: './track-detail.component.html',
  styleUrls: ['./track-detail.component.scss'],
})
export class TrackDetailComponent implements OnInit {
  public alreadyLiked: boolean;
  public selectedSong: any;
  public id: string;
  public result: string;
  public names: string[];
  @Input() trackItem: Track;
  @Input() description: {
    name: string;
    description: string;
    image: string;
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private spotifyService: SpotifyService,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    this.spotifyService.song$.next(this.trackItem?.id);
    this.getArtists();
    this.activatedRoute.params.subscribe(
      (param: { id: string }) => (this.id = param.id)
    );

    this.spotifyService.song$.subscribe((song) => (this.selectedSong = song));

    this.spotifyService
      .getLikedTrack([`${this.selectedSong}`])
      .subscribe((liked: boolean[]) => (this.alreadyLiked = liked[0]));
  }

  public getArtists(): string[] {
    return (this.names = this.trackItem.artists.map(({ name }) => ' ' + name));
  }

  async presentActionAuthor(): Promise<void> {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Album',
      subHeader: this.trackItem?.album?.name,
      buttons: [],
    });

    await actionSheet.present();
  }

  async presentActionArtists() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Artists',
      subHeader: this.getArtists().toString(),
      buttons: [],
    });

    await actionSheet.present();
  }

  public likeSong(): void {
    this.spotifyService
      .likeSong([`${this.selectedSong}`])
      .pipe(
        switchMap(() => {
          return this.spotifyService.getLikedTrack([`${this.trackItem.id}`]);
        })
      )
      .subscribe((liked: boolean[]) => {
        this.alreadyLiked = liked[0];
        this.trackItem.liked = liked[0];
      });
  }

  public dislikeSong() {
    this.spotifyService
      .dislikeSong([`${this.trackItem.id}`])
      .pipe(
        switchMap(() => {
          return this.spotifyService.getLikedTrack([`${this.trackItem.id}`]);
        })
      )
      .subscribe((liked: boolean[]) => {
        this.alreadyLiked = liked[0];
        this.trackItem.liked = liked[0];
      });
  }

  public close(): void {
    const modals = document.getElementsByTagName('ion-modal');
    [].forEach.call(modals, function (el: any) {
      el.parentNode.removeChild(el);
    });
  }
}
