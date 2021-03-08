import { Component, Input, EventEmitter, Output, OnInit, SimpleChanges } from '@angular/core';
import { PagesInfo } from '../debtor/debtor'

@Component({
  selector: 'debtors-list-pager',
  templateUrl: './debtors-list-pager.component.html',
  styleUrls: ['./debtors-list-pager.component.css']
})
export class DebtorsListPagerComponent implements OnInit {

  @Input()
  pagesInfo: PagesInfo = {self: 1, pages: []};
  prevPage: number = 0;
  nextPage: number = 0;

  @Output() pageNumberChanged = new EventEmitter<Number>();

  constructor() { 
    this.prevPage = 0;
    this.nextPage = 0;
    this.pagesInfo = {self: 1, pages: []};
  }

  ngOnInit() {
  }

  onPageClick(event: MouseEvent) {
    const element = event.target as HTMLElement;
    const attribute = element.getAttribute("value");
    const pageNumber = Number(attribute);
    console.log(`clicked on page ${pageNumber}`);
    if (pageNumber > 0 && pageNumber <= this.pagesInfo.pages.length 
        && pageNumber != this.pagesInfo.self) {
      this.pageNumberChanged.emit(pageNumber);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const changedPagesInfo = changes["pagesInfo"];
    if (changedPagesInfo && changedPagesInfo.currentValue)
    {
      console.log("Cahnged pagesInfo");
      console.log("new pagesInfo.pages: " + changedPagesInfo.currentValue.pages);
      console.log("new pagesInfo.pages.length: " + changedPagesInfo.currentValue.pages.length);
      this.prevPage = changedPagesInfo.currentValue.self - 1;
      console.log(`prevPage = ${this.prevPage}`);
      this.nextPage = changedPagesInfo.currentValue.self + 1;
      console.log(`nextPage = ${this.nextPage}`);
    }
  }

}
