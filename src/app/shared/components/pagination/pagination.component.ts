import { AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() 
  currentPage: number;
  @Input() 
  itemsPerPage: number;
  @Input() 
  totalItems: number;
  @Output() 
  pageChanged: EventEmitter<number> = new EventEmitter();

  /**  nombre total page */
  length = 0;
  pageSizeOptions = [8,12];
  showPageSizeOptions = true;
  pageSize: number = 0;   
  pageEvent: PageEvent;
  pageIndex = 0;


  constructor() { }

  ngOnInit() {
    console.log( this.totalItems )
    this.pageSize = this.itemsPerPage;
    this.pageIndex = this.currentPage;
    this.length = this.totalItems;
  }


  changePage(page: number): void {
    if (page >= 1 && page <= this.totalItems) {
      this.currentPage = page;
      this.pageChanged.emit(page);
    }
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    // this.pageChanged.emit(this.currentPage + 1);


  }




}
