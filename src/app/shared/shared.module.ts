import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostsListComponent } from '@components';
import { MaterialModule } from './material/material.module';
import { ButtonComponent } from './components/button/button.component';
import { LoaderComponent } from './components/loader/loader.component';
import { CardComponent } from './components/card/card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PostsListComponent,
    ButtonComponent,
    LoaderComponent,
    CardComponent
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
    CardComponent

  ]
})
export class SharedModule { }
