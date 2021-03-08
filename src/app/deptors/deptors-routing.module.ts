import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DebtorsListCtrlComponent } from './../debtors-list-ctrl/debtors-list-ctrl.component';
import { DebtorCardComponent } from './../debtor-card/debtor-card.component';

const routes: Routes = [
    { path: '', component: DebtorsListCtrlComponent},
    { path: 'debtors', component: DebtorsListCtrlComponent },
    { path: 'debtor/:id', component: DebtorCardComponent},
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class DebtorsRoutingModule {}