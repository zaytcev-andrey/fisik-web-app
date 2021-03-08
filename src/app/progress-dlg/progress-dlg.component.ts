import { Component, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { DebtorsInteractionService } from '../debtor/debtors-interaction.service';

@Component({
  selector: 'progress-dlg',
  templateUrl: './progress-dlg.component.html',
  styleUrls: ['./progress-dlg.component.css']
})
export class ProgressDlgComponent implements OnInit {

    display: boolean = false;
    private display$ = this.debtorsInteractionService.GetProgressDlgState();

    constructor(private debtorsInteractionService: DebtorsInteractionService) { }

    ngOnInit() {
        this.display$
            .subscribe(value => this.display = value);
    }

}
