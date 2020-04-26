import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbumsPage } from './albums.page';
import { SongsPageModule} from '../songs/songs.module';

const routes: Routes = [
  {
    path: '',
    component: AlbumsPage
  },
  {
    path: 'songs',
    loadChildren: () => import('../songs/songs.module').then(m => m.SongsPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlbumsPageRoutingModule {}
