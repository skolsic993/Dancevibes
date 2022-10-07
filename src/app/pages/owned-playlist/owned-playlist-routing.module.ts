import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnedPlaylistPage } from './owned-playlist.page';

const routes: Routes = [
  {
    path: '',
    component: OwnedPlaylistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OwnedPlaylistPageRoutingModule {}
