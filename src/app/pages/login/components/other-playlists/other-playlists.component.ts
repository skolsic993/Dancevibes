import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-other-playlists',
  templateUrl: './other-playlists.component.html',
  styleUrls: ['./other-playlists.component.scss'],
})
export class OtherPlaylistsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  public segmentChanged(event: any) {
    console.log('Segment changed', event);
  }
}
