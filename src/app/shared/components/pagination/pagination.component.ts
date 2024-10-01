import { AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() currentPage: number;
  /** indique posts par page */
  @Input() itemsPerPage: number;
  /** nombre de posts au total */
  @Input() totalItems: number;
  /** récupère le nombre de pages avec des posts */
  @Input() pagesWithPosts: number;
  /** emet la page sur laquelle on se trouve */
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();
  /**  nombre total page */
  length = 0;
  /** indique si on peut afficher ou non les choix de layout */
  showPageSizeOptions = true;
  /** indique le nombre d'item par page */
  pageSize: number = 0;   
  pageEvent: PageEvent;
  pageIndex = 0;


  constructor() { }

  ngOnInit() {
    this.pageSize = this.itemsPerPage;
    this.pageIndex = this.currentPage;
    this.length = this.totalItems;
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.pageChanged.emit(e.pageIndex + 1);
  }




}
