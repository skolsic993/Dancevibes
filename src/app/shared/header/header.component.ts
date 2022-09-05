import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

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
