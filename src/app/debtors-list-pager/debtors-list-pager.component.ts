import { Component, Input, OnInit } from '@angular/core';
import { PagesInfo } from '../debtor/debtor'

@Component({
  selector: 'debtors-list-pager',
  templateUrl: './debtors-list-pager.component.html',
  styleUrls: ['./debtors-list-pager.component.css']
})
export class DebtorsListPagerComponent implements OnInit {

  @Input()
  pagesInfo: PagesInfo;

  constructor() { }

  ngOnInit() {
    //this.pagesInfo = { self : 1, pages: [2, 3, 4] };
  }

}
