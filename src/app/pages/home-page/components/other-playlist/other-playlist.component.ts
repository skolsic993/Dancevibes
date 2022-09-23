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
  @Input() featuredRawPlaylists: Observable<{ items: Playlist[] }>;
  @Input() newReleasedPlaylists: Observable<any>;
  @Input() rawCategories: Observable<any>;

  constructor(private router: Router) {}

  ngOnInit() {
    this.segmentChanged({ detail: { value: 'features' } });
  }

  public segmentChanged(event: any): void {
    switch (event?.detail?.value) {
      case 'new-releases': {
        this.playlists = this.newReleasedPlaylists.pipe(
          pluck('albums'),
          pluck('items')
        );
        break;
      }
      case 'categories': {
        this.playlists = this.rawCategories.pipe(
          pluck('categories'),
          pluck('items')
        );
        break;
      }
      default: {
        this.playlists = this.featuredRawPlaylists.pipe(
          pluck('playlists'),
          pluck('items')
        );
        break;
      }
    }
  }

  public onSelect(item: Playlist) {
    this.router.navigate([`/playlists/${item.id}`]);
  }
}
