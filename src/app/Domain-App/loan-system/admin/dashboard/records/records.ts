import { Component } from '@angular/core';
import {SiModules} from './si-modules/si-modules';
import {Banks} from './banks/banks';
import {Nationalities} from './nationalities/nationalities';
import {HeaderPoly} from '../../../../chat/request/header-poly/header-poly';
import { CountryComponent} from './country/country';

@Component({
  selector: 'app-records',
  imports: [
    SiModules,
    Banks,
    Nationalities,
    HeaderPoly,

    CountryComponent
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
