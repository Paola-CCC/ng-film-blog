import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { POSTS_ROUTES } from './posts.routes';
import { RouterModule } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { DetailPostComponent } from './detail-post/detail-post.component';



@NgModule({
  declarations: [AddPostComponent,DetailPostComponent],
  exports: [AddPostComponent,DetailPostComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(POSTS_ROUTES)
  ]
})
export class PostsModule { }
