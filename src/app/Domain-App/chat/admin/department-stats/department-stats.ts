import {Component, signal, WritableSignal} from '@angular/core';
import {LoadingCard} from '../../../../shared/loading-card/loading-card';
interface annualData{
  month: string;     label: string;     swaps: number;     percent: string;
}
@Component({
  selector: 'app-department-stats',
  imports: [
    LoadingCard
  ],
  templateUrl: './department-stats.html',
  styleUrl: './department-stats.scss'
})
export class DepartmentStats {
  isLoading = signal<boolean>(false);
  totalSwap: WritableSignal<number> = signal(0);
  annualData:annualData[] =[
    {month:'January', label:'Jan', swaps:4, percent:"40" + "%"    },
    {month:'February', label:'Feb', swaps:4, percent:"60" + "%"   },
    {month:'March', label:'Mar', swaps:4, percent:"20" + "%"   },
    {month:'April', label:'Apr', swaps:4, percent:"80" + "%"   },
    {month:'May', label:'May', swaps:4, percent:"30" + "%"   },
    {month:'June', label:'Jun', swaps:4, percent:"50" + "%"   },
    {month:'July', label:'Jul', swaps:4, percent:"10" + "%"   },
    {month:'August', label:'Aug', swaps:4, percent:"40" + "%"   },
    {month:'September', label:'Sep', swaps:4, percent:"40" + "%"   },
    {month:'October', label:'Oct', swaps:4, percent:"40" + "%"   },
    {month:'November', label:'Nov', swaps:4, percent:"40" + "%"   },
    {month:'December', label:'Dec', swaps:4, percent:"40" + "%"   },
  ]

}
