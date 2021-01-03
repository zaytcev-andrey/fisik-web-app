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
// business logic
import { RequestFormComponent } from './request-form/request-form.component';
import { DebtorsListFormComponent } from './debtors-list-form/debtors-list-form.component';
import { DebtorsService } from './debtor/debtors.service';
import { DeptorsComponent } from './deptors/deptors.component';

@NgModule({
  declarations: [
    AppComponent,
    RequestFormComponent,
    DebtorsListFormComponent,
    DeptorsComponent
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
    TableModule
  ],
  providers: [
    DebtorsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
