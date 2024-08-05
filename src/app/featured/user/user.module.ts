import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { USER_ROUTES } from './user.routes';
import { LoginComponent, RegisterComponent } from './pages';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [   
    LoginComponent,
    RegisterComponent 
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(USER_ROUTES),
    
  ]
})
export class UserModule { }
