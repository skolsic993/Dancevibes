import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Playlist } from 'src/app/Models/playlist.model';

@Component({
  selector: 'app-other-playlist-swiper',
  templateUrl: './other-playlist-swiper.component.html',
  styleUrls: ['./other-playlist-swiper.component.scss'],
})
export class OtherPlaylistSwiperComponent implements OnInit {
  public playlists: Observable<Playlist[]>;
  @Input() otherRawPlaylists: Observable<any>;

  constructor() {}

  ngOnInit() {}
}
