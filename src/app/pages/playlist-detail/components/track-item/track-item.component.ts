import { Component, Input, OnInit } from '@angular/core';
import { Track } from 'src/app/Models/track.model';

@Component({
  selector: 'app-track-item',
  templateUrl: './track-item.component.html',
  styleUrls: ['./track-item.component.scss'],
})
export class TrackItemComponent implements OnInit {
  @Input() trackItem: Track;

  constructor() {}

  ngOnInit() {
    console.log(this.trackItem);
  }

  public convertMsToMinutesSeconds(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.round((milliseconds % 60000) / 1000);

    return seconds === 60
      ? `${minutes + 1}:00`
      : `${minutes}:${this.padTo2Digits(seconds)}`;
  }

  private padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
}
