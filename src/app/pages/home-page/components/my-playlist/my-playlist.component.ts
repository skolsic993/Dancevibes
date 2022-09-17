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
  @Input() rawPlaylists: Observable<{ items: Playlist[] }>;

  constructor(private router: Router) {}

  ngOnInit() {
    this.playlists = this.rawPlaylists.pipe(pluck('items'));
  }

  public onSelect(item: Playlist) {
    this.router.navigate([`/playlists/${item.id}`]);
  }
}
