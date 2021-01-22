import { Component, OnInit } from '@angular/core';
import { DebtorsService } from '../debtor/debtors.service';
import { DebtorSearchParams } from '../debtor/debtor-search-params';
import { Debtor } from '../debtor/debtor';
import { PagesInfo } from '../debtor/debtor';

@Component({
  selector: 'deptors',
  templateUrl: './deptors.component.html',
  styleUrls: ['./deptors.component.css']
})
export class DeptorsComponent implements OnInit {

  debtors: Debtor[];
  pagesInfo: PagesInfo;
  debtorSearchParams: DebtorSearchParams;
  pageNumber: Number;

  constructor(private debtorsService: DebtorsService) { 

  }

  ngOnInit() {
    this.pagesInfo = {self : 1, pages : [1,2,3,4,5] }
  }

  searchDebtors() {
    this.debtorsService.searchDebtors(
      this.debtorSearchParams.surname
      , this.debtorSearchParams.name
      , this.debtorSearchParams.middleName
      , this.pageNumber)
    .subscribe(response => {
        this.debtors = response.debtors;
        console.log(this.debtors);
        this.pagesInfo = response.pagesInfo;
        console.log(this.pagesInfo);
        
    }); 
    console.log(this.debtors);
  }


  onDebtorSearchParamsReady(debtorSearchParams: DebtorSearchParams) {
    console.log(debtorSearchParams);
    this.debtorSearchParams = debtorSearchParams;
    this.searchDebtors();
  }

  onPageNumberChanged(pageNumber: Number) {
    console.log(`page number changed ${pageNumber}`);
    this.pageNumber = pageNumber;
    this.searchDebtors();
  }

}
