import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mini-header',
  templateUrl: './mini-header.component.html',
  styleUrls: ['./mini-header.component.scss'],
})
export class MiniHeaderComponent implements OnInit {
  @Input() showOptions: boolean;
  @Input() title: string;

  constructor() {}

  ngOnInit() {}
}
