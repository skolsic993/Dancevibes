import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '@supabase/supabase-js';
import { first, switchMap } from 'rxjs/operators';
import { Playlist } from 'src/app/Models/playlist.model';
import { Track } from 'src/app/Models/track.model';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-owner-playlist-items',
  templateUrl: './owner-playlist-items.component.html',
  styleUrls: ['./owner-playlist-items.component.scss'],
})
export class OwnerPlaylistItemsComponent implements OnInit {
  public numberOfPlaylists: boolean = true;
  public name: string;
  public id: string;
  public ownerPlaylists: Playlist[];
  public user: User;

  public searchPlaylistForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
  });

  @Input() track: Track;
  @Input() playlists: Playlist[];
  @Output() createNewPlaylist = new EventEmitter<boolean>();

  constructor(
    private spotifyService: SpotifyService,
    private location: Location
  ) {}

  ngOnInit() {}

  public addSongToPlaylist(playlist: Playlist): void {}

  public showErrors(): string {
    const control = this.searchPlaylistForm.controls['search'];

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

  private getSong(): void {
    this.spotifyService.song$
      .pipe(
        first(),
        switchMap((id: string) => this.spotifyService.getSpecificTrack(id))
      )
      .subscribe((track: Track) => (this.track = track));
  }

  public onSubmit(): void {
    console.log('submit');
  }

  async redirectToHome(): Promise<void> {
    this.location.back();
  }

  public setCreatePlaylist() {
    this.createNewPlaylist.emit(true);
  }

  public addTrackToPlaylist(playlist: Playlist) {
    this.getSong();

    this.spotifyService
      .addItemsToThePlaylist(playlist.id, this.track)
      .subscribe();

    this.location.back();
  }
}
