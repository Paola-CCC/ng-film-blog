import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  id : any; 

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    // const ID : number = this.route.snapshot.paramMap.get('id');
    // this.route.params.subscribe( params => {
    //   console.log(params);
    //   if (params) {
    //     this.id = params.id;
    //   }
    // });
  }

}
