import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenresPage } from './genres.page';
import { AlbumsPage } from '../albums/albums.page';

const routes: Routes = [
  {
    path: '',
    component: GenresPage
  },
  {
    path: 'albums',
    loadChildren: () => import('../albums/albums.module').then(m => m.AlbumsPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenresPageRoutingModule {}
