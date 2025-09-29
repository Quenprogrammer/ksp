import {Component, signal} from '@angular/core';
import {LoanByState} from './loan-by-state/loan-by-state';
import {EmploymentStatus} from './employment-status/employment-status';
import {LoanByInterestRateComponent} from './loan-by-intrest-rate/loan-by-intrest-rate';
import {LoanStatistics} from './loan-statistics/loan-statistics';
import {LoanByBanks} from './loan-by-banks/loan-by-banks';
import {LoanByAmount} from './loan-by-amount/loan-by-amount';
import {LoanByNationalty} from './loan-by-nationalty/loan-by-nationalty';
import {Logs} from '../logs/logs';
import {LoanBySims} from './loan-by-sims/loan-by-sims';
import {LoanByGender} from './loan-by-gender/loan-by-gender';
import {LoanMenu} from './loan-menu/loan-menu';
import {Loniars} from './loniars/loniars';
import {SideBar} from './side-bar/side-bar';
import {AddBank} from '../add-bank/add-bank';
import {AddSim} from '../add-sim/add-sim';
import {NgClass, NgIf} from '@angular/common';


@Component({
  selector: 'app-dashboard',
  imports: [
    LoanByState,
    EmploymentStatus,
    LoanByInterestRateComponent,
    LoanStatistics,
    LoanByBanks,
    LoanByAmount,
    LoanByNationalty,
    Logs,
    LoanBySims,
    LoanByGender,
    LoanMenu,
    Loniars,
    SideBar,
    AddBank,
    AddSim,
    NgIf,
    NgClass,


  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  openModal = signal(true);
}
