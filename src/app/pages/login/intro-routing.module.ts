import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistDetailComponent } from './components/playlist-detail/playlist-detail.component';

import { IntroPage } from './intro.page';

const routes: Routes = [
  {
    path: 'home',
    component: IntroPage,
  },
  {
    path: 'home/:id',
    component: PlaylistDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntroPageRoutingModule {}
