import { Component, Input, OnInit } from '@angular/core';
import { Playlist } from 'src/app/Models/playlist.model';

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss'],
})
export class PlaylistItemComponent implements OnInit {
  @Input() width: string;
  @Input() textPadding: string;
  @Input() textSize: string;
  @Input() height: string;
  @Input() shadow: string;
  @Input() imageHeight: string;
  @Input() flexDirection: string;
  @Input() playlistItem: Playlist;

  constructor() {}

  ngOnInit() {}

  public getFirstImage(): string {
    return this.playlistItem?.images
      ? this.playlistItem?.images[0]?.url
      : this.playlistItem?.icons[0]?.url;
  }
}
