import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Playlist } from 'src/app/Models/playlist.model';

@Component({
  selector: 'app-other-playlists',
  templateUrl: './other-playlist.component.html',
  styleUrls: ['./other-playlist.component.scss'],
})
export class OtherPlaylistComponent implements OnInit {
  public playlists: Observable<Playlist[]>;
  @Input() otherRawPlaylists: Observable<{ items: Playlist[] }>;

  constructor() {}

  ngOnInit() {}

  public segmentChanged(event: any) {
    console.log('Segment changed', event);
  }
}
