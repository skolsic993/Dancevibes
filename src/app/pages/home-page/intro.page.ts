import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { User } from '@supabase/supabase-js';
import anime from 'animejs/lib/anime.es';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  public user: User;

  session: any;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private authService: AuthService
  ) {
    this.session = this.authService.getSession();
  }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.authService.authChanges((_, session) => (this.session = session));

    this.isAuthenticated();

    this.getPulseTextAnimation();
  }

  public isAuthenticated(): boolean {
    if (this.session) {
      return true;
    }
    return false;
  }

  async login(): Promise<void> {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.signIn().then(
      async (data) => {
        this.isAuthenticated();
        await loading.dismiss();
        this.router.navigateByUrl('/');
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

  public getPulseTextAnimation(): void {
    let ml4 = {} as any;
    ml4.opacityIn = [0, 1];
    ml4.scaleIn = [0.2, 1];
    ml4.scaleOut = 5;
    ml4.durationIn = 800;
    ml4.durationOut = 600;

    anime
      .timeline({ loop: true })
      .add({
        targets: '.ml4 .letters-1',
        opacity: ml4.opacityIn,
        scale: ml4.scaleIn,
        duration: ml4.durationIn,
      })
      .add({
        targets: '.ml4 .letters-1',
        opacity: 0,
        scale: ml4.scaleOut,
        duration: ml4.durationOut,
        easing: 'easeInExpo',
        delay: ml4.delay,
      })
      .add({
        targets: '.ml4 .letters-2',
        opacity: ml4.opacityIn,
        scale: ml4.scaleIn,
        duration: ml4.durationIn,
      })
      .add({
        targets: '.ml4 .letters-2',
        opacity: 0,
        scale: ml4.scaleOut,
        duration: ml4.durationOut,
        easing: 'easeInExpo',
        delay: ml4.delay,
      })
      .add({
        targets: '.ml4 .letters-3',
        opacity: ml4.opacityIn,
        scale: ml4.scaleIn,
        duration: ml4.durationIn,
      })
      .add({
        targets: '.ml4 .letters-3',
        opacity: 0,
        scale: ml4.scaleOut,
        duration: ml4.durationOut,
        easing: 'easeInExpo',
        delay: ml4.delay,
      })
      .add({
        targets: '.ml4 .letters-4',
        opacity: ml4.opacityIn,
        scale: ml4.scaleIn,
        duration: ml4.durationIn,
      })
      .add({
        targets: '.ml4 .letters-4',
        opacity: 0,
        scale: ml4.scaleOut,
        duration: ml4.durationOut,
        easing: 'easeInExpo',
        delay: ml4.delay,
      })
      .add({
        targets: '.ml4',
        opacity: 0,
        duration: 500,
        delay: 500,
      });
  }
}
