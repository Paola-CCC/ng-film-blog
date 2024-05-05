import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from 'src/app/_services/post/post.service';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css']
})
export class DetailPostComponent implements OnInit {

  /** représente l'Id du post */
  id : any;
  console = console;
  errorMessage : string = '';
  contents : any ;
  constructor(private route: ActivatedRoute , private postService : PostService) {}


  ngOnInit(): void {
    //option 1
    this.id = this.route.snapshot.paramMap.get('id');

    this.postService.getAll().subscribe({
      next: data => {
        this.contents = data.filter((element: any) => String(element.id) === this.id);
      },
      error: err => {
        this.console.log(err);
        this.errorMessage = err;
      }
    });
  }

}
