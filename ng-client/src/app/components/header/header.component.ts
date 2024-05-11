import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { AuthService } from '@services';

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
    private route : ActivatedRoute ,
    private auth: AuthService
  ) { }

  ngOnInit(): void {}

  ngDoCheck() {
    this.userIsLogger = this.auth.userIsLogged;    
  }

  logOutNow(){
    this.auth.logOut();
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
