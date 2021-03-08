import { Component, OnInit } from '@angular/core';
import { Debtor } from '../debtor/debtor';
import { PagesInfo } from '../debtor/debtor';
import { DebtorsService } from '../debtor/debtors.service';
import { DebtorSearchResult } from '../debtor/debtor';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DebtorsInteractionService } from '../debtor/debtors-interaction.service';

@Component({
    selector: 'debtors-list-ctrl',
    templateUrl: './debtors-list-ctrl.component.html',
    styleUrls: ['./debtors-list-ctrl.component.css']
})
export class DebtorsListCtrlComponent implements OnInit {

    debtors: Debtor[];
    pagesInfo: PagesInfo;
    debtorSearchResult$: Observable<DebtorSearchResult>;

    constructor(private debtorsService: DebtorsService,
        private route: ActivatedRoute,
        private debtorsInteractionService: DebtorsInteractionService) { }

    ngOnInit() 
    {
        console.log('DebtorsListCtrlComponent.ngOnInit');
        this.debtors = [];
        this.pagesInfo = {self: 1, pages: []};

        this.debtorSearchResult$ = this.route.paramMap.pipe(
            switchMap(params => {
              return this.debtorsService.getDebtors();
            })
          );

        this.debtorSearchResult$
          .subscribe(response => {
              console.log('debtorSearchResult$.subscribe');
              this.debtors = response.debtorsInfoArray;
              console.log(this.debtors);
              this.pagesInfo = response.pagesInfo;
              console.log(this.pagesInfo);
              
          }); 
          console.log(this.debtors);
    }

    onPageNumberChanged(pageNumber: number) 
    {
        console.log('DebtorsListCtrlComponent.ngOnInit');
        console.log(`page number changed ${pageNumber}`);
        this.debtorsInteractionService.SetPageNumber(pageNumber);
    }    

}
