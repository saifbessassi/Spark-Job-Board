import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sp-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() nbItems: number;
  @Input() nbItemsPerPage: number;
  @Input() currentPage: number;

  @Output() pageNumber = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit() {
  }

  createArray() {
    let x: number;
    if (this.nbItems % this.nbItemsPerPage !== 0) {
      x = Math.floor(this.nbItems / this.nbItemsPerPage) + 1;
    } else {
      x = this.nbItems / this.nbItemsPerPage;
    }
    const tab: number[] = [];
    for (let i = 1; i <= x; i++) {
      tab.push(i);
    }
    return tab;
  }

  onPage(page) {
    this.pageNumber.emit(page);
  }
}
