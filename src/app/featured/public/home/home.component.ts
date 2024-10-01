import { Component, OnInit } from '@angular/core';
import { IPosts } from '@shared/interfaces';
import { HelperService, PostService } from '@shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  /**Element à afficher */
  postLastestList: IPosts[] = [] ;
  /**Element à afficher */
  postNewestAsHero: IPosts = {} as IPosts ;
  /** Message d'erreur */
  errorMessage : string = '';
  /** Liste de Posts à afficher */
  topPostsList: IPosts[] = [];

  constructor( 
    private postService: PostService,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {

    this.postService.getFrontLatestPost().subscribe({
      next:(data : IPosts[]) => {
        if( data.length > 0 ){
          this.postLastestList = data;
        }
      },
      error:(err: any) => {
        console.log( 'Error ' , err)
      }
    });


  this.postService.getFrontPost().subscribe({
    next:(newestPost : IPosts[]) => {

      if( newestPost.length > 0){
        this.postNewestAsHero = newestPost[0];
      }
    },
    error:(err: any) => {
      console.log( 'Error ' , err)
    }
  });

    this.postService.getFrontListPost().subscribe({
      next: (data: IPosts[]) => {
        this.topPostsList = data;
      },
      error: err => {
        console.log(err);
        this.errorMessage = err.message;
      }
    });
  }




  public checkObjectIsEmpty(value: any): boolean {
    return Object.values(value).length === 0;
  }

  get backgroundStyle(){
    return `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${this.postNewestAsHero.thumbnail}) center/cover no-repeat;`;
  }

  public convertDate(dateStr: string): string  {
    return this.helperService.converterToFrenchDate(dateStr);
  }



}
