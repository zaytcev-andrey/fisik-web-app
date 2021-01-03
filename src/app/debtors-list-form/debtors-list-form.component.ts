import { Component, Input, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { Debtor } from '../debtor/debtor';
import { DebtorsService } from '../debtor/debtors.service';

@Component({
  selector: 'debtors-list-form',
  templateUrl: './debtors-list-form.component.html',
  styleUrls: ['./debtors-list-form.component.css']
})
export class DebtorsListFormComponent implements OnInit {

  debtors1: Debtor[];
  @Input() debtors: Debtor[];

  constructor(private debtorsService: DebtorsService) { }

  ngOnInit() {
    this.debtors1 = [ 
      { surname: '', name : 'Test', middleName: '', taxpayerNumber : 1, region : 'Test', address : 'Test' }, 
      { surname: '', name : 'Test', middleName: '', taxpayerNumber : 2, region : 'Test', address : 'Test' } ];
  }



}
