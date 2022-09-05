import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Track } from './../../../../Models/track.model';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss'],
})
export class TrackListComponent implements OnInit {
  public trackList: any;

  @Input() tracks: Observable<{
    tracks: { href: string; total: 0; items: { track: Track } };
  }>;

  constructor() {}

  ngOnInit() {
    this.tracks
      .pipe(pluck('tracks'))
      .subscribe((tracks: { total: number; items: { track: Track } }) => {
        this.trackList = tracks?.items;

        console.log(this.trackList);
      });
  }
}
