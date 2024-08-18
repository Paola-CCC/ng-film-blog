import { Component, Input, OnInit } from '@angular/core';
import { IPosts } from '@shared/interfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

   @Input()
   post: IPosts | undefined = {} as IPosts;

  constructor() { }

  ngOnInit() {}

}
