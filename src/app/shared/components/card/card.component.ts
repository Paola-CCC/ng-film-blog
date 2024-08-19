import { Component, Input, OnInit } from '@angular/core';
import { IPosts } from '@shared/interfaces';
import { HelperService } from '@shared/services';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

   @Input()
   post: IPosts | undefined = {} as IPosts;

  constructor( private helperService : HelperService) { }

  ngOnInit() {}

  convertDate(dateStr: string): string {
    return this.helperService.converterToFrenchDate(dateStr);
  }
}
