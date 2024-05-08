import { Component, ViewEncapsulation } from '@angular/core';
import { TokenStorageService } from './_services/token/token-storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None // Pour permettre le ciblage global

})
export class AppComponent {}
