import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/home-page/intro.module').then((m) => m.IntroPageModule),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./pages/search-page/search-page.module').then(
        (m) => m.SearchPageModule
      ),
  },
  {
    path: 'playlists/:id',
    loadChildren: () =>
      import('./pages/playlist-detail/playlist-detail.module').then(
        (m) => m.PlaylistDetailPageModule
      ),
  },
  {
    path: 'owned-playlist',
    loadChildren: () =>
      import('./pages/owned-playlist/owned-playlist.module').then(
        (m) => m.OwnedPlaylistPageModule
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
