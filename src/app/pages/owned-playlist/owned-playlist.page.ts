import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import {
  concatMap,
  delay,
  first,
  pluck,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Playlist } from 'src/app/Models/playlist.model';
import { Track } from 'src/app/Models/track.model';
import { SpotifyService } from 'src/app/services/spotify.service';
import { User } from './../../Models/user';

@Component({
  selector: 'app-owned-playlist',
  templateUrl: './owned-playlist.page.html',
  styleUrls: ['./owned-playlist.page.scss'],
})
export class OwnedPlaylistPage implements OnInit {
  public numberOfPlaylists: boolean = true;
  public name: string;
  public id: string;
  public ownerPlaylists: Playlist[];
  public user: User;
  public track: Track;
  public createNewPlaylist: boolean = false;

  public createPlaylistForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
  });

  constructor(
    private router: Router,
    private spotifyService: SpotifyService,
    private actionSheetCtrl: ActionSheetController,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.spotifyService
      .getUser()
      .pipe(
        concatMap((user) => {
          this.user = user;
          this.id = user.id;
          return this.spotifyService.getUsersPlaylists(user);
        }),
        pluck('items'),
        shareReplay()
      )
      .subscribe((playlists: Playlist[]) => {
        this.ownerPlaylists = playlists.filter((item: Playlist) => {
          return item.owner.display_name == this.user.display_name;
        });
      });

    this.getSong();
  }

  public showErrors(): string {
    const control = this.createPlaylistForm.controls['name'];

    if (control.errors) {
      if (control.errors.hasOwnProperty('minlength')) {
        return 'Minimal length is 3 characters!';
      }
      if (control.errors.hasOwnProperty('required')) {
        return 'Name is required!';
      }
      if (control.errors.hasOwnProperty('maxlength')) {
        return 'Maximal length is 30 characters!';
      }
    }
  }

  async presentActionArtists(): Promise<void> {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Errors',
      subHeader: this.showErrors(),
      buttons: [],
    });

    await actionSheet.present();
  }

  private getSong(): void {
    this.spotifyService.song$
      .pipe(
        first(),
        switchMap((id: string) => this.spotifyService.getSpecificTrack(id))
      )
      .subscribe((track: Track) => (this.track = track));
  }

  public onSubmit(): void {
    if (this.createPlaylistForm.invalid) {
      this.presentActionArtists();
      return;
    }

    this.spotifyService
      .createPlaylist(this.createPlaylistForm.value, this.id)
      .pipe(
        switchMap((response: Playlist) => {
          console.log(this.track);
          return this.spotifyService.addItemsToThePlaylist(
            response.id,
            this.track
          );
        }),
        tap(() => this.spotifyService.refreshPlaylist$.next(true)),
        delay(100)
      )
      .subscribe();

    this.router.navigateByUrl('/home');
  }

  async redirectToHome(): Promise<void> {
    this.location.back();
  }
}
