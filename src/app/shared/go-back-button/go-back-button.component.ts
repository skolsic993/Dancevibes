import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-go-back-button',
  templateUrl: './go-back-button.component.html',
  styleUrls: ['./go-back-button.component.scss'],
})
export class GoBackButtonComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit() {}

  async redirectToHome(): Promise<void> {
    this.location.back();
  }
}
