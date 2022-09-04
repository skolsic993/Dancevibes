import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Playlist } from 'src/app/Models/playlist.model';

@Component({
  selector: 'app-other-playlists',
  templateUrl: './other-playlists.component.html',
  styleUrls: ['./other-playlists.component.scss'],
})
export class OtherPlaylistsComponent implements OnInit {
  public playlists: Observable<Playlist[]>;
  @Input() otherRawPlaylists: Observable<{ items: Playlist[] }>;

  constructor() {}

  ngOnInit() {}

  public segmentChanged(event: any) {
    console.log('Segment changed', event);
  }
}
