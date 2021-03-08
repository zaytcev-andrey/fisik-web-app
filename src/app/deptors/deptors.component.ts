import { Component, OnInit, ViewChild } from '@angular/core';
import { DebtorsService } from '../debtor/debtors.service';
import { DebtorSearchParams } from '../debtor/debtor-search-params';
import { Debtor } from '../debtor/debtor';
import { PagesInfo } from '../debtor/debtor';
import { DebtorsInteractionService } from '../debtor/debtors-interaction.service';

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

  constructor(
    private debtorsService: DebtorsService,
    private debtorsInteractionService: DebtorsInteractionService) { 
  }

  ngOnInit() {
    this.pagesInfo = {self : 1, pages : [1,2,3,4,5] }
    this.debtorsInteractionService.GetPageNamber()
        .subscribe(debtorsPageNumber => {
            this.onPageNumberChanged(debtorsPageNumber);
    });
  }

  searchDebtors() {
    this.debtorsInteractionService.ShowProgressDlg();
    this.debtorsService.searchDebtors(
      this.debtorSearchParams.surname
      , this.debtorSearchParams.name
      , this.debtorSearchParams.middleName
      , this.pageNumber)
    .subscribe(response => {
        this.debtorsInteractionService.HideProgressDlg();
        this.debtors = response.debtorsInfoArray;
        console.log(this.debtors);
        this.pagesInfo = response.pagesInfo;
        console.log(this.pagesInfo);
    }); 
    console.log(this.debtors);
  }

  onDebtorSearchParamsReady(debtorSearchParams: DebtorSearchParams) {
    console.log(debtorSearchParams);
    this.debtorSearchParams = debtorSearchParams;
    // reset page number
    this.pageNumber = 0;
    this.searchDebtors();
  }

  onPageNumberChanged(pageNumber: Number) {
    console.log(`page number changed ${pageNumber}`);
    this.pageNumber = pageNumber;
    this.searchDebtors();
  }

}
