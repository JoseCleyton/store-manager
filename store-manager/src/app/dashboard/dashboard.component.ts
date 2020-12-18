import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public lineChartData: ChartDataSets[];
  public lineChartLabels: Label[];
  public lineChartColors: Color[];
  public lineChartLegend;
  public lineChartType;
  public lineChartPlugins;

  public lineChartData2: ChartDataSets[];
  public lineChartLabels2: Label[];
  public lineChartColors2: Color[];
  public lineChartLegend2;
  public lineChartType2;

  public polarAreaChartLabels: Label[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail Sales',
    'Telesales',
    'Corporate Sales',
  ];
  public polarAreaChartData: SingleDataSet = [300, 500, 100, 40, 120];
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';

  constructor() {}

  ngOnInit(): void {
    this.lineChartData = [
      {
        data: [20, 30, 109, 10, 40, 60, 91, 108, 102, 66, 88, 93],
        label: 'Valores dos Pedidos',
      },
    ];
    this.lineChartLabels = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];

    this.lineChartColors = [
      {
        borderColor: 'black',
        backgroundColor: 'rgba(0,127,255)',
      },
    ];

    this.lineChartLegend = 'true';

    this.lineChartType = 'line';
    this.lineChartPlugins = [];

    this.lineChartData2 = [
      {
        data: [20, 30, 109, 10, 40, 60, 91, 108, 102, 66, 88, 93],
        label: 'Valores dos Pedidos',
      },
    ];

    this.lineChartLabels2 = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];

    this.lineChartColors2 = [
      {
        borderColor: 'white',
        backgroundColor: [
          'rgba(62,87,212)',
          'rgb(212, 87, 62)',
          'rgb(62, 212, 87)',
          'rgb(87, 62, 212)',
          'rgb(62, 187, 212)',
          'rgb(212, 62, 187)',
          'rgba(197,229,35)',
          'rgb(3, 99, 118)',
          'rgb(118, 3, 42)',
          'rgb(244, 248, 37)',
          'rgb(97, 13, 175)',
          'rgb(18, 2, 33)',
        ],
      },
    ];
    this.lineChartType2 = 'doughnut';
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}
