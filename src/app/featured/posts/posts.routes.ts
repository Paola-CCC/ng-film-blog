import { Route, Routes } from "@angular/router";
import { DetailPostComponent } from "./detail-post/detail-post.component";
import { AddPostComponent } from "./add-post/add-post.component";
import { AllPostComponent } from "./all-post/all-post.component";


export const POSTS_ROUTES: Routes = [
      { path: 'add', component: AddPostComponent },
      { path: 'all', component: AllPostComponent },
      { path: ':id', component: DetailPostComponent },
];