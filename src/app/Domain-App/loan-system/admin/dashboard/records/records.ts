import { Component } from '@angular/core';
import {SiModules} from './si-modules/si-modules';
import {Banks} from './banks/banks';

import {HeaderPoly} from '../../../../chat/request/header-poly/header-poly';
import { CountryComponent} from './country/country';
import {LoanApplicationsRecords} from './loan-applications-records/loan-applications-records';
import {TransactionsRecords} from './transactions-records/transactions-records';
import {UsersActivities} from './users-activities/users-activities';

@Component({
  selector: 'app-records',
  imports: [
    SiModules,
    Banks,

    HeaderPoly,

    CountryComponent,
    LoanApplicationsRecords,
    TransactionsRecords,
    UsersActivities
  ],
  templateUrl: './records.html',
  styleUrl: './records.css'
})
export class Records {
  activeTab: string = 'banks';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
