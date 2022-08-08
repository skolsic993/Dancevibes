import { SpotifyService } from './../../services/spotify.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user: any;
  constructor(
    private router: Router,
    private supabaseService: SupabaseService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private spotifyService: SpotifyService
  ) {}

  ngOnInit() {
    this.user = this.supabaseService.getUser();
  }

  async logout(): Promise<void> {
    const loading = await this.loadingController.create();
    await loading.present();

    this.supabaseService.signOut().then(
      async () => {
        await loading.dismiss();
        this.router.navigateByUrl('/intro', { replaceUrl: true });
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
