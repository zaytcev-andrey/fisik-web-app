import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { PagesInfo } from '../debtor/debtor'

@Component({
  selector: 'debtors-list-pager',
  templateUrl: './debtors-list-pager.component.html',
  styleUrls: ['./debtors-list-pager.component.css']
})
export class DebtorsListPagerComponent implements OnInit {

  @Input()
  pagesInfo: PagesInfo;

  @Output() pageNumberChanged = new EventEmitter<Number>();

  constructor() { }

  ngOnInit() {
  }

  onPageClick(event: MouseEvent) {    
    const pageNumber = Number((event.target as HTMLElement).textContent);
    console.log(`clicked on page ${pageNumber}`);
    this.pageNumberChanged.emit(pageNumber);
  }

}
