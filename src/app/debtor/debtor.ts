export class Debtor {
    surname: string;
    name: string;
    middleName: string;
    taxpayerNumber: number;
    region : string;
    address : string;
}

export class PagesInfo {
    self : number;
    pages : number[];
}

export class DebtorSearchResult {
    pagesInfo: PagesInfo;
    debtors: Debtor[];
}