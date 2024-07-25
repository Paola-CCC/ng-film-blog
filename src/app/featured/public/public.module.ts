import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PUBLIC_ROUTES } from './public.routes';
import { RouterModule } from '@angular/router';
import { PostsListComponent } from '@components';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(PUBLIC_ROUTES)
  ]
})
export class PublicModule { }
