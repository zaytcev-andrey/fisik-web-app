import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DebtorSearchParams } from '../debtor/debtor-search-params';

@Component({
  selector: 'request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {

  surname: string;
  name: string;
  middleName: string;
  address: string;

  @Output() debtorSearchParamsReady = new EventEmitter<DebtorSearchParams>();
  
  constructor() { }

  ngOnInit() {
  }

  onClickSearch() {
    let debtorSearchParams = {
      surname: this.surname, name: this.name, middleName: this.middleName, address: ''
    };
    this.debtorSearchParamsReady.emit(debtorSearchParams);
  }

}
