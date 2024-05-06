import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { UserService } from 'src/app/_services/user/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  userId: number | null = 1; 
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
