import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-button',
  templateUrl: './home-button.component.html',
  styleUrls: ['./home-button.component.scss'],
})
export class HomeButtonComponent implements OnInit {
  public song$: BehaviorSubject<string>;
  public signedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.authChanges((signed) => {
      signed == 'SIGNED_IN'
        ? this.signedIn$.next(true)
        : this.signedIn$.next(false);
    });
  }

  public redirectToHome(): void {
    this.router.navigateByUrl('/home');
  }

  public redirectToSearch(): void {
    this.router.navigateByUrl('/home');
  }

  public redirectToLibrary(): void {
    this.router.navigateByUrl('/home');
  }
}
