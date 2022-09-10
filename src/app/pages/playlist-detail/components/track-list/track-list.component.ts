import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Track } from './../../../../Models/track.model';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss'],
})
export class TrackListComponent implements OnInit {
  public topLimit: number = 5;
  public trackList: any = [];
  public dataList: any;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  @Input() tracks: Observable<{
    href: string;
    total: 0;
    items: { track: Track };
  }>;

  constructor() {}

  ngOnInit() {
    this.tracks.subscribe((items) => {
      this.dataList = items?.items;
      this.dataList.forEach((data: { track: Track }, index: number) => {
        if (index < 9) {
          data.track.uid = '0' + (index + 1);
        } else {
          data.track.uid = `${index + 1}`;
        }
      });

      this.trackList = this.dataList?.slice(0, this.topLimit);
    });
  }

  loadData(event) {
    setTimeout(() => {
      this.topLimit += 4;
      this.trackList = this.dataList?.slice(0, this.topLimit);
      event.target.complete();

      if (this.trackList.length === this.dataList.length) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
