import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DebtorsInteractionService 
{
    private deptorsPage$ : Observable<number>;
    private deptorsPageSource = new Subject<number>();
    private deptorsShowProgressDlgSource = new Subject<boolean>();
    private deptorsShowProgressDlg$ : Observable<boolean>;
  
    constructor() 
    {
        this.deptorsPage$ = this.deptorsPageSource.asObservable();
        this.deptorsShowProgressDlg$ = this.deptorsShowProgressDlgSource.asObservable();
    }

    SetPageNumber(page: number)
    {
        this.deptorsPageSource.next(page);
    }

    GetPageNamber() : Observable<number>
    {
        return this.deptorsPage$;
    }

    ShowProgressDlg()
    {
        this.deptorsShowProgressDlgSource.next(true);
    }

    HideProgressDlg()
    {
        this.deptorsShowProgressDlgSource.next(false);
    }

    GetProgressDlgState(): Observable<boolean>
    {
        return this.deptorsShowProgressDlg$;
    }
}
