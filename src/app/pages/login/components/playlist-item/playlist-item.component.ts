import { Component, Input, OnInit } from '@angular/core';
import { Playlist } from 'src/app/Models/playlist.model';

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss'],
})
export class PlaylistItemComponent implements OnInit {
  @Input() playlistItem: Playlist;

  constructor() {}

  ngOnInit() {}

  public getFirstImage(): string {
    return this.playlistItem.images[0]?.url;
  }
}
