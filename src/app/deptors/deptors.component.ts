import { Component, OnInit } from '@angular/core';
import { DebtorsService } from '../debtor/debtors.service';
import { DebtorSearchParams } from '../debtor/debtor-search-params';
import { Debtor } from '../debtor/debtor';

@Component({
  selector: 'deptors',
  templateUrl: './deptors.component.html',
  styleUrls: ['./deptors.component.css']
})
export class DeptorsComponent implements OnInit {

  debtors: Debtor[];

  constructor(private debtorsService: DebtorsService) { 

  }

  ngOnInit() {
  }

  onDebtorSearchParamsReady(debtorSearchParams: DebtorSearchParams) {
    console.log(debtorSearchParams);
    this.debtorsService.searchDebtors(debtorSearchParams.surname, debtorSearchParams.name, debtorSearchParams.middleName)
    .subscribe(response => {
        this.debtors = response;
        console.log(this.debtors);
    }); 
    console.log(this.debtors);
  }

}
