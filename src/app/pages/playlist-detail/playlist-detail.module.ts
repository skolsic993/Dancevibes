import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DescriptionPipe } from './../../pipes/description.pipe';
import { SharedModule } from './../../shared/shared.module';
import { PlaylistHeroSectionComponent } from './components/playlist-hero-section/playlist-hero-section.component';
import { TrackItemComponent } from './components/track-item/track-item.component';
import { TrackListComponent } from './components/track-list/track-list.component';

import { IonicModule } from '@ionic/angular';

import { PlaylistDetailPageRoutingModule } from './playlist-detail-routing.module';

import { PlaylistDetailPage } from './playlist-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaylistDetailPageRoutingModule,
    SharedModule,
  ],
  declarations: [
    PlaylistDetailPage,
    PlaylistHeroSectionComponent,
    DescriptionPipe,
    TrackListComponent,
    TrackItemComponent,
  ],
})
export class PlaylistDetailPageModule {}
