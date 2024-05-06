import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user/user.service';
import { PostService } from '../../_services/post/post.service';
import { Router } from '@angular/router';

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

  console = console

  constructor(private userService: UserService ,private postService : PostService, private router: Router) { }

  ngOnInit(): void {}



}
