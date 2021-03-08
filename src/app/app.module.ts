import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// primeng
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ProgressBarModule } from 'primeng/progressbar';
// business logic
import { RequestFormComponent } from './request-form/request-form.component';
import { DebtorsListFormComponent } from './debtors-list-form/debtors-list-form.component';
import { DebtorsService } from './debtor/debtors.service';
import { DeptorsComponent } from './deptors/deptors.component';
import { DebtorsListPagerComponent } from './debtors-list-pager/debtors-list-pager.component';
import { DebtorsRoutingModule } from './deptors/deptors-routing.module';
import { DebtorCardComponent } from './debtor-card/debtor-card.component';
import { DebtorsListCtrlComponent } from './debtors-list-ctrl/debtors-list-ctrl.component';
import { ProgressDlgComponent } from './progress-dlg/progress-dlg.component';

@NgModule({
  declarations: [
    AppComponent,
    RequestFormComponent,
    DebtorsListFormComponent,
    DeptorsComponent,
    DebtorsListPagerComponent,
    DebtorCardComponent,
    DebtorsListCtrlComponent,
    ProgressDlgComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PanelModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    TableModule,
    CardModule,
    DialogModule,
    ProgressBarModule,
    DebtorsRoutingModule
  ],
  providers: [
    DebtorsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
