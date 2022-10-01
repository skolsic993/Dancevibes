import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Track } from 'src/app/Models/track.model';

@Component({
  selector: 'app-track-detail',
  templateUrl: './track-detail.component.html',
  styleUrls: ['./track-detail.component.scss'],
})
export class TrackDetailComponent implements OnInit {
  public result: string;
  public names: string[];
  @Input() trackItem: Track;

  constructor(private actionSheetCtrl: ActionSheetController) {}

  ngOnInit() {
    this.getArtists();
    console.log(this.trackItem);
  }

  public getArtists(): string[] {
    return (this.names = this.trackItem.artists.map(({ name }) => ' ' + name));
  }

  async presentActionAuthor() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Album',
      subHeader: this.trackItem?.album?.name,
      buttons: [],
    });

    await actionSheet.present();
  }

  async presentActionArtists() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Artists',
      subHeader: this.getArtists().toString(),
      buttons: [],
    });

    await actionSheet.present();
  }
}
