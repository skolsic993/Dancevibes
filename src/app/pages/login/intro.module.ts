import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { MyPlaylistComponent } from './components/my-playlist/my-playlist.component';
import { PlaylistItemComponent } from './components/playlist-item/playlist-item.component';
import { IntroPage } from './intro.page';

import { IonicModule } from '@ionic/angular';

import { IntroPageRoutingModule } from './intro-routing.module';

import { SwiperModule } from 'swiper/angular';

import { OtherPlaylistComponent } from './components/other-playlist/other-playlist.component';
import { PlaylistDetailComponent } from './components/playlist-detail/playlist-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroPageRoutingModule,
    SwiperModule,
    SharedModule,
  ],
  declarations: [
    IntroPage,
    HomeComponent,
    MyPlaylistComponent,
    PlaylistItemComponent,
    OtherPlaylistComponent,
    PlaylistDetailComponent,
  ],
})
export class IntroPageModule {}
