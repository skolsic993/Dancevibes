import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { concatMap, pluck, switchMap } from 'rxjs/operators';
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
  public usersPlaylist: Playlist[];
  public user: User;

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
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    this.spotifyService
      .getUser()
      .pipe(
        concatMap((user) => {
          this.user = user;
          this.id = user.id;
          return this.spotifyService.getUsersPlaylists(user);
        }),
        pluck('items')
      )
      .subscribe((playlists: Playlist[]) => {
        this.usersPlaylist = playlists.filter((item: Playlist) => {
          return item.owner.display_name == this.user.display_name;
        });
      });
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

  async presentActionArtists() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Errors',
      subHeader: this.showErrors(),
      buttons: [],
    });

    await actionSheet.present();
  }

  public onSubmit() {
    if (this.createPlaylistForm.invalid) {
      this.presentActionArtists();
      return;
    }

    this.spotifyService
      .createPlaylist(this.createPlaylistForm.value, this.id)
      .pipe(
        switchMap((response: Playlist) => {
          return this.spotifyService.song$.pipe(
            concatMap((id: string) => {
              return this.spotifyService.getSpecificTrack(id);
            }),
            switchMap((track: Track) =>
              this.spotifyService.addItemsToThePlaylist(response.id, track)
            )
          );
        })
      )
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/home');
        },
      });
  }
}
