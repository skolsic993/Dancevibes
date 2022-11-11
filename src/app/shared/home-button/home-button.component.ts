import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home-button',
  templateUrl: './home-button.component.html',
  styleUrls: ['./home-button.component.scss'],
})
export class HomeButtonComponent implements OnInit {
  public song$: BehaviorSubject<string>;
  public signedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private router: Router) {}

  ngOnInit() {}

  public redirectToHome(): void {
    this.router.navigateByUrl('/home');
  }

  public redirectToSearch(): void {
    this.router.navigateByUrl('/search');
  }

  public redirectToLibrary(): void {
    this.router.navigateByUrl('/home');
  }
}
