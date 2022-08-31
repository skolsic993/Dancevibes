import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Playlist } from 'src/app/Models/playlist.model';
import { AuthService } from 'src/app/services/auth.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public playlists: Observable<{ items: Playlist[] }>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private spotifyService: SpotifyService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.playlists = this.spotifyService.getPlaylists();
  }

  async logout(): Promise<void> {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.signOut().then(
      async () => {
        await loading.dismiss();
        this.router.navigateByUrl('/', { replaceUrl: true });
      },
      async (err) => {
        await loading.dismiss();
        this.showError('Login failed!', err.message);
      }
    );
  }

  async showError(title: string, msg: string): Promise<void> {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
