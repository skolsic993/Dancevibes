import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Track } from 'src/app/Models/track.model';
import { AuthService } from './../../../../services/auth.service';

@Component({
  selector: 'app-playlist-hero-section',
  templateUrl: './playlist-hero-section.component.html',
  styleUrls: ['./playlist-hero-section.component.scss'],
})
export class PlaylistHeroSectionComponent implements OnInit {
  public heroSectionData: {
    name: string;
    description: string;
    image: string;
  };

  public tracks: Track;

  @Input() alreadyLiked: boolean;
  @Input() data: Observable<{
    name: string;
    description: string;
    image: string;
  }>;
  @Output() unfollowPlaylist = new EventEmitter();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.data.subscribe(
      (data: { name: string; description: string; image: string }) => {
        this.heroSectionData = data;
      }
    );
  }

  public getUsername(): string {
    return this.authService.getUser()?.user_metadata?.full_name;
  }

  public likePlaylist() {
    this.unfollowPlaylist.emit(this.alreadyLiked);
  }

  public showImage(): string {
    return this.heroSectionData?.image
      ? this.heroSectionData?.image
      : '/assets/no-image.png';
  }
}
