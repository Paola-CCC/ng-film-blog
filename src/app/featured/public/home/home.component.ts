import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService, UserService } from '@shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  /**Element à afficher */
  contents : any ;
  /** Message d'erreur */
  errorMessage : string = '';

  constructor() {}

  ngOnInit(): void {}



}
