import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import * as posts from './data.json';
import { IPosts } from '@shared/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  
  postToSend: IPosts = (posts as IPosts);

}
