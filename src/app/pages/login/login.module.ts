import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { PlaylistItemComponent } from './components/playlist-item/playlist-item.component';
import { PlaylistComponent } from './components/playlists/playlist.component';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { SwiperModule } from 'swiper/angular';

import { OtherPlaylistSwiperComponent } from './components/other-playlist-swiper/other-playlist-swiper.component';
import { OtherPlaylistsComponent } from './components/other-playlists/other-playlists.component';
import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    SwiperModule,
  ],
  declarations: [
    LoginPage,
    HomeComponent,
    PlaylistComponent,
    PlaylistItemComponent,
    OtherPlaylistsComponent,
    OtherPlaylistSwiperComponent,
  ],
})
export class LoginPageModule {}
