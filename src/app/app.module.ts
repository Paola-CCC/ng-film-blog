import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './featured/public/home/home.component';
import { ProfilComponent } from './featured/user/pages/profil/profil.component';
import { HeaderComponent } from './components/header/header.component';
import { DetailPostComponent } from './featured/posts/detail-post/detail-post.component';
import { PostsListComponent } from './featured/posts/posts-list/posts-list.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./featured/public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./featured/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'post',
    loadChildren: () => import('./featured/posts/posts.module').then(m => m.PostsModule)
  },
  {
    path: 'add-post',
    loadChildren: () => import('./featured/posts/posts.module').then(m => m.PostsModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfilComponent,
    HeaderComponent,
    DetailPostComponent,
    PostsListComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES, { useHash: true }),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
