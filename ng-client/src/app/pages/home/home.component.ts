import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user/user.service';
import { PostService } from '../../_services/post/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  /**Element à afficher */
  contents : any ;
  /** Message d'erreur */
  errorMessage : string = '';

  console = console

  constructor(private userService: UserService ,private postService : PostService, private router: Router) { }

  ngOnInit(): void {

    this.postService.getAll().subscribe({
        next: data => {
          this.contents = data;
        },
        error: err => {
          this.console.log(err);
          this.errorMessage = err;
        }
      });

    // this.post.addNewPost(elementData).subscribe({
    //   next: data => {
    //     console.log('succes' , data); 
    //   },
    //   error: err => {
    //     console.log('echec');
    //   }
    // });
  }


  navigateToElement(id : any): void {
    this.router.navigate(['/post' , id]);
  }

}
