import { Playlist } from 'src/app/Models/playlist.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss'],
})
export class PlaylistItemComponent implements OnInit {
  @Input() playlistItem: Playlist;

  constructor() {}

  ngOnInit() {}

  onSlideChange() {
    console.log('slide change');
  }
}
