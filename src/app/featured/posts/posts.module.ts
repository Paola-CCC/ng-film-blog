import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { POSTS_ROUTES } from './posts.routes';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/modules/shared.module';
import { AddPostComponent } from './add-post/add-post.component';
import { DetailPostComponent } from './detail-post/detail-post.component';
import { PostsListComponent } from '@components';



@NgModule({
  declarations: [AddPostComponent,DetailPostComponent],
  exports: [AddPostComponent,DetailPostComponent],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(POSTS_ROUTES)
  ]
})
export class PostsModule { }
