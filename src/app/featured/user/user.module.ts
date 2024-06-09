import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { USER_ROUTES } from './user.routes';
import { LoginComponent, RegisterComponent } from './pages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/modules/shared.module';



@NgModule({
  declarations: [   
    LoginComponent,
    RegisterComponent 
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(USER_ROUTES),
    SharedModule

  ]
})
export class UserModule { }
