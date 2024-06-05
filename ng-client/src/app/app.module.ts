import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './featured/user/pages/login/login.component';
import { RegisterComponent } from './featured/user/pages/register/register.component';
import { HomeComponent } from './featured/public/home/home.component';
import { ProfilComponent } from './featured/user/pages/profil/profil.component';
import { HeaderComponent } from './components/header/header.component';
import { DetailPostComponent } from './featured/posts/detail-post/detail-post.component';
import { PostsListComponent } from './featured/posts/posts-list/posts-list.component';
import { RouterModule, Routes } from '@angular/router';
import { UserModule } from '@featured/user/user.module';
import { PostsModule } from '@featured/posts/posts.module';
import { PublicModule } from '@featured/public/public.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**',  component: PageNotFoundComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
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
    ReactiveFormsModule,
    PublicModule,
    UserModule,
    PostsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
