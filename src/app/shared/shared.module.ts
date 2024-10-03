import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { ButtonComponent } from './components/button/button.component';
import { LoaderComponent } from './components/loader/loader.component';
import { CardComponent } from './components/card/card.component';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PostsListComponent } from './components';

@NgModule({
  declarations: [
    PostsListComponent,
    ButtonComponent,
    LoaderComponent,
    CardComponent,
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PostsListComponent,
    ButtonComponent,
    MaterialModule,
    LoaderComponent,
    CardComponent,
    PaginationComponent,
  ],
  
})
export class SharedModule { }
