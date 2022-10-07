import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';

import { IonicModule } from '@ionic/angular';

import { OwnedPlaylistPageRoutingModule } from './owned-playlist-routing.module';

import { OwnedPlaylistPage } from './owned-playlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OwnedPlaylistPageRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [OwnedPlaylistPage],
})
export class OwnedPlaylistPageModule {}
