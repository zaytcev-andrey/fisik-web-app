import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Debtor } from '../debtor/debtor';
import { DebtorsService } from '../debtor/debtors.service';

@Component({
  selector: 'app-debtor-card',
  templateUrl: './debtor-card.component.html',
  styleUrls: ['./debtor-card.component.css']
})
export class DebtorCardComponent implements OnInit {

    debtor$: Observable<Debtor>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private debtorsService: DebtorsService
    ) 
    { 

    }

    ngOnInit() 
    {
        const debtorId = this.route.snapshot.paramMap.get('id');
        console.log(debtorId);
        this.debtor$ = this.debtorsService.GetDebtor(debtorId);
    }

    gotoDebtors()
    {
        this.router.navigate(['/api/debtors']);
    }

}
