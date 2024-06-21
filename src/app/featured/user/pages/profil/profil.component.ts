import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, UserService } from '@shared/services';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  userId: number; 
  userData: any;

  constructor(private route: ActivatedRoute , private userService: UserService , private auth: AuthService) { }

  ngOnInit(): void {
    this.userId = this.auth.userDatasStored.id;
    this.userService.getById(this.userId).subscribe({
      next: data => {
        this.userData = data;
      },
      error: err => {
        console.log(err);
      }
    });

  }

}
