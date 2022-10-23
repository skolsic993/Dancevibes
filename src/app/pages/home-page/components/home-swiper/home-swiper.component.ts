import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Playlist } from 'src/app/Models/playlist.model';

@Component({
  selector: 'app-home-swiper',
  templateUrl: './home-swiper.component.html',
  styleUrls: ['./home-swiper.component.scss'],
})
export class HomeSwiperComponent implements OnInit {
  @Input() title: string;
  @Input() playlists: Observable<Playlist[]>;

  constructor(private router: Router) {}

  ngOnInit() {}

  public onSelect(item: Playlist) {
    this.router.navigate([`/playlists/${item.id}`]);
  }
}
