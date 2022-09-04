import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Playlist } from '../../../../Models/playlist.model';

@Component({
  selector: 'app-my-playlist',
  templateUrl: './my-playlist.component.html',
  styleUrls: ['./my-playlist.component.scss'],
})
export class MyPlaylistComponent implements OnInit {
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
