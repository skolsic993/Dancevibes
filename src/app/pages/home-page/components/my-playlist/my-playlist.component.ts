import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public releasedPlaylists: Observable<Playlist[]>;

  @Input() rawPlaylists: Observable<{ items: Playlist[] }>;
  @Input() newReleasedPlaylists: Observable<{ items: Playlist[] }>;

  constructor(private router: Router) {}

  ngOnInit() {
    this.playlists = this.rawPlaylists.pipe(pluck('items'));
    this.releasedPlaylists = this.newReleasedPlaylists.pipe(
      pluck('albums'),
      pluck('items')
    );
  }

  public onSelect(item: Playlist) {
    this.router.navigate([`/playlists/${item.id}`]);
  }
}
