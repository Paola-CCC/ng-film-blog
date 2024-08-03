import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PUBLIC_ROUTES } from './public.routes';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(PUBLIC_ROUTES)
  ],
  exports:[HomeComponent]
})
export class PublicModule { }
