import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'browse',
        loadChildren: () => import('../genres/genres.module').then(m => m.GenresPageModule)
      },
      {
        path: 'playlist',
        loadChildren: () => import('../playlist/playlist.module').then(m => m.PlaylistPageModule)
      },
      {
        path: 'players',
        loadChildren: () => import('../players/players.module').then(m => m.PlayersPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/browse',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/browse',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
