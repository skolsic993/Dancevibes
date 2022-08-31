import { pluck } from 'rxjs/operators';
import { Playlist } from './../../../../Models/playlist.model';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
  public playlists: Observable<Playlist[]>;
  @Input() rawPlaylists: Observable<{ items: Playlist[] }>;

  constructor() {}

  ngOnInit() {
    this.playlists = this.rawPlaylists.pipe(pluck('items'));
  }

  onSlideChange() {
    console.log('slide change');
  }
}
