import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Track } from 'src/app/Models/track.model';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Artists } from './../../../../Models/artists.model';

@Component({
  selector: 'app-track-item',
  templateUrl: './track-item.component.html',
  styleUrls: ['./track-item.component.scss'],
})
export class TrackItemComponent implements OnInit {
  public playButton: boolean = true;
  public names: string[];

  @Input() trackItem: Track;

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit() {
    this.getTrackArtists();
  }

  public convertMsToMinutesSeconds(milliseconds: number) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.round((milliseconds % 60000) / 1000);

    return seconds === 60
      ? `${minutes + 1}:00`
      : `${minutes}:${this.padTo2Digits(seconds)}`;
  }

  private padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  @ViewChild(IonModal) modal: IonModal;

  name: string;

  public close() {
    this.modal.dismiss(null, 'cancel');
  }

  public getTrackArtists() {
    return this.trackItem.artists.map((item: Artists) => {
      return item.name;
    });
  }

  public confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  public playSong(trackItem: Track) {
    this.playButton = false;
    this.spotifyService.song$.next(trackItem?.uri);
    this.spotifyService.playSong(trackItem).subscribe();
  }

  public pauseSong(trackItem: Track) {
    this.playButton = true;
    this.spotifyService.song$.next(trackItem?.uri);
    this.spotifyService.pauseSong(trackItem?.uri).subscribe();
  }
}
