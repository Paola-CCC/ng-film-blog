import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { POSTS_ROUTES } from './posts.routes';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(POSTS_ROUTES)

  ]
})
export class PostsModule { }
