import { Component, Input, OnInit } from '@angular/core';
import { Track } from 'src/app/Models/track.model';

@Component({
  selector: 'app-track-detail',
  templateUrl: './track-detail.component.html',
  styleUrls: ['./track-detail.component.scss'],
})
export class TrackDetailComponent implements OnInit {
  public names: string[];
  @Input() trackItem: Track;

  constructor() {}

  ngOnInit() {
    this.getArtists();
  }

  public getArtists(): void {
    this.names = this.trackItem.artists.map(({ name }) => ' ' + name);
  }
}
