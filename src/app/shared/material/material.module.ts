import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';

const materialModules = [
  MatButtonModule,
  MatDividerModule,
  MatIconModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatRadioModule
];

@NgModule({
  imports: materialModules,
  exports: materialModules
})



export class MaterialModule { }
