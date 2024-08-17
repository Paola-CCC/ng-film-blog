import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostsListComponent } from '@components';
import { MaterialModule } from './material/material.module';
import { ButtonComponent } from './components/button/button.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    PostsListComponent,
    ButtonComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PostsListComponent,
    ButtonComponent,
    MaterialModule,
    LoaderComponent

  ]
})
export class SharedModule { }
