import {AfterViewInit, Component} from '@angular/core';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-crypto-tokens',
  imports: [],
  template: `
    <div class="row">
      @for(items of cryptoLists; track items.name){
        <div class="col-sm-6 col-lg-4 mb-3">
          <a class="card card-hover-shadow" [style.background-color]="backgroundColor">
            <div class="card-body">
              <div class="row g-1">
                <div class="col-auto">
                  <div class="avatar avatar-md avatar-circle" [style.background-color]="backgroundColor">
                    <img [src]="items.logo" class="avatar-img">
                  </div>
                </div>

                <div class="col-auto">
                  <h6 class="card-subtitle" [style.color]="textColor">{{items.name}}</h6>
                  <h4 [style.color]="textColor">{{items.price}}</h4>
                </div>
              </div>

              <div class="row align-items-center gx-2 mb-1">
                <div class="col-6 col-lg-12">
                  <h1 class="display-5 text-center" [style.color]="textColor">{{items.change}}</h1>
                </div>

                <div class="col-6 col-lg-12">
                  <div style="height: 3rem;">
                    <canvas id="sessionsChart" width="164" height="48"></canvas>
                  </div>
                </div>
              </div>

              <span class="badge bg-soft-success" [style.color]="textColor">
                <i class="bi-graph-up" [style.color]="textColor"></i> 1.7%
              </span>
              <span class="text-body fs-6 ms-1" [style.color]="textColor">
                Market cap {{items.marketCap}}
              </span>
            </div>
          </a>
        </div>
      }
    </div>


`,
})
export class CryptoTokens implements AfterViewInit{

  ngAfterViewInit(): void {
    const ctx = document.getElementById('sessionsChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          '1 May', '2 May', '3 May', '4 May', '5 May', '6 May', '7 May',
          '8 May', '9 May', '10 May', '11 May', '12 May', '13 May', '14 May',
          '15 May', '16 May', '17 May', '18 May', '19 May', '20 May', '21 May',
          '22 May', '23 May', '24 May', '25 May', '26 May', '27 May', '28 May',
          '29 May', '30 May', '31 May'
        ],
        datasets: [{
          data: [
            21, 20, 24, 20, 18, 17, 15, 17, 30, 30, 35, 25, 18, 30, 31, 35, 35,
            90, 90, 90, 85, 100, 120, 120, 120, 100, 90, 75, 75, 75, 90
          ],
          backgroundColor: 'rgba(55, 125, 255, 0)',
          borderColor: '#377dff',
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 0,
          tension: 0.4,
          fill: false,
        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
          x: { display: false },
          y: { display: false }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            intersect: false,
            mode: 'nearest',
          }
        }
      }
    });

  }

  cryptoLists=[
    {name:'Bitcoin', price:'$4,024.97', change:'29.09%', marketCap:'$4,456', logo:'tokens/bitcoin.png' },
    {name:'Ethereum', price:'$4,024.97', change:'2.09%', marketCap:'$4,456', logo:'tokens/etherium.webp'},
    {name:'Solana', price:'$4,024.97', change:'2.09%', marketCap:'$4,456', logo:'tokens/solana.webp'},
    {name:'BNB', price:'$4,024.97', change:'2.09%', marketCap:'$4,456', logo:'tokens/bnb.webp'},
    {name:'XRP', price:'$4,024.97', change:'2.09%', marketCap:'$4,456', logo:'tokens/xrp.webp'},
    {name:'XRP', price:'$4,024.97', change:'2.09%', marketCap:'$4,456', logo:'token/shiba.png'},
  ]
  protected readonly textColor = 'black';
  protected readonly backgroundColor = 'white';
}
