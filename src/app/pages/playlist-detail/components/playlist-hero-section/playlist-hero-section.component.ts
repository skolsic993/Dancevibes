import { Component, Input, OnInit } from '@angular/core';
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

  @Input() data: Observable<{
    name: string;
    description: string;
    image: string;
  }>;

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
}
