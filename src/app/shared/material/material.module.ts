import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';

const materialModules = [
  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatPaginatorModule

];

@NgModule({
  imports: [
    ...materialModules
  ],
  exports: [
    ...materialModules
  ]
})



export class MaterialModule { }
