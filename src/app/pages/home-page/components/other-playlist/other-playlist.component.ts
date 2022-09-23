import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Playlist } from 'src/app/Models/playlist.model';

@Component({
  selector: 'app-other-playlist',
  templateUrl: './other-playlist.component.html',
  styleUrls: ['./other-playlist.component.scss'],
})
export class OtherPlaylistComponent implements OnInit {
  public playlists: Observable<Playlist[]>;
  public newPlaylists: Observable<Playlist[]>;
  public categories: Observable<Playlist[]>;
  @Input() featuredRawPlaylists: Observable<{ items: Playlist[] }>;
  @Input() newReleasedPlaylists: Observable<{ items: Playlist[] }>;
  @Input() rawCategories: Observable<{ items: Playlist[] }>;

  constructor(private router: Router) {}

  ngOnInit() {
    this.playlists = this.featuredRawPlaylists.pipe(
      pluck('playlists'),
      pluck('items')
    );
    this.newPlaylists = this.newReleasedPlaylists.pipe(
      pluck('albums'),
      pluck('items')
    );
    this.categories = this.rawCategories.pipe(
      pluck('categories'),
      pluck('items')
    );
  }

  public onSelect(item: Playlist) {
    this.router.navigate([`/playlists/${item.id}`]);
  }
}
