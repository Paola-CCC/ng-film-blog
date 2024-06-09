import { Route, Routes } from "@angular/router";
import { DetailPostComponent } from "./detail-post/detail-post.component";

export const POSTS_ROUTES: Routes = [
    { path: ':id', component: DetailPostComponent
},
]