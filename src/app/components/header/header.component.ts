import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from '@shared/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /** indique si navbar mobile est ouvert */
  mobileNavbarIsOpen: boolean = false;
  /** Id de l'utilisateur */
  userIsLogger: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  ngDoCheck() {
    this.userIsLogger = this.auth.userIsLogged;    
  }

  logOutNow(){
    if(localStorage.getItem('user')){
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    }
    
    this.router.navigate(['']);
    window.location.reload();

  }

  openMobileNavbar() {
    if(this.mobileNavbarIsOpen ){
      this.mobileNavbarIsOpen = false;
      document.body.style.overflow = 'auto';
    } else {
      this.mobileNavbarIsOpen = true;
      document.body.style.overflow = 'hidden';

    }
  };



}
