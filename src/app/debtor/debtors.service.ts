import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of, Subject, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Debtor } from './debtor';
import { DebtorSearchResult } from './debtor';

@Injectable()
export class DebtorsService {
    private debtorsUrl = 'api/debtors';  // URL to web API
    private debtorSearchResult$: Observable<DebtorSearchResult>;
    private debtorSearchResultDefault = new DebtorSearchResult();
    private debtorSearchResultSource = new BehaviorSubject<DebtorSearchResult>(this.debtorSearchResultDefault);
    
    constructor ( private http: HttpClient ) 
    {
        this.debtorSearchResult$ = this.debtorSearchResultSource.asObservable();
    }

    searchDebtors(surname: string, name: string, middleName: string, pageNumber: Number = 0): Observable<DebtorSearchResult> {
        if (surname) {
            surname.trim();
        }
        if (name) {
            name.trim();
        }
        if (middleName) {
            middleName.trim();
        }
        const paramSurname = surname ? `surname=${surname}` : '';
        const paramName = name ? `name=${name}` : '';
        const paramMiddleName = middleName ? `middleName=${middleName}` : '';
        const paramPageNumber = pageNumber ? `page=${pageNumber}` : '';
        let paramsSearch = paramSurname;
        if (paramsSearch && paramName) {
            paramsSearch += '&';
        }
        paramsSearch += paramName;
        if (paramsSearch && paramMiddleName) {
            paramsSearch += '&';
        }
        paramsSearch += paramMiddleName;
        if (paramsSearch && paramPageNumber) {
            paramsSearch += '&';
        }
        paramsSearch += paramPageNumber;
        const debtorsSearchUrl = this.debtorsUrl + (paramsSearch ? ('?' + paramsSearch ) : ''); 
        console.log(debtorsSearchUrl);
        const searchResult = this.http.get<DebtorSearchResult>(debtorsSearchUrl)
            .pipe(
                tap(_ => console.log('fetched debtor')),
                catchError(this.handleError<DebtorSearchResult>('searchDebtors', <DebtorSearchResult>{}))
        );
        searchResult
            .subscribe(response => {
                this.debtorSearchResultSource.next(response);
        }); 

        return searchResult;
    }

    getDebtors(): Observable<DebtorSearchResult>
    {
        console.log(this.debtorSearchResultSource.getValue());
        return this.debtorSearchResult$;
    }

    GetDebtor(id: number | string) 
    {
        return this.getDebtors().pipe(
          // (+) before `id` turns the string into a number
          map((debtorSearchResult: DebtorSearchResult) => 
            debtorSearchResult.debtorsInfoArray.find(debtor => debtor.id === +id)));
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
    
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
    
          // TODO: better job of transforming error for user consumption
          console.log(`${operation} failed: ${error.message}`);
    
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
    }
}