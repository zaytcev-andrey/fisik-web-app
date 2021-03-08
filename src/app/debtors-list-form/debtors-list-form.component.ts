import { Component, Input, OnInit } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { Debtor } from '../debtor/debtor';

@Component({
  selector: 'debtors-list-form',
  templateUrl: './debtors-list-form.component.html',
  styleUrls: ['./debtors-list-form.component.css']
})
export class DebtorsListFormComponent implements OnInit {

  @Input() debtors: Debtor[];

  constructor() {}

  ngOnInit() {
  }

}
