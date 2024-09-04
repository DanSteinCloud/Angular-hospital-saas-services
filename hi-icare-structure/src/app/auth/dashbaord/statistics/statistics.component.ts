import * as Highcharts from 'highcharts';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  chartOptions!: {};
  Highcharts = Highcharts;

  constructor() { }
  ngOnInit(): void {
    this.chartOptions = {

      title: {
          text: 'Vos services les plus utilisés, 2018-2022'
      },
  
      subtitle: {
          text: 'Source: nid.stats.com'
      },
  
      yAxis: {
          title: {
              text: 'Nombre de patients'
          }
      },
  
      xAxis: {
          accessibility: {
              rangeDescription: 'Range: 2018 to 2022'
          }
      },
  
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
      },
  
      plotOptions: {
          series: {
              label: {
                  connectorAllowed: false
              },
              pointStart: 2018
          }
      },
  
      series: [{
          name: 'Service prénatal',
          data: [43934, 52503, 57177, 69658, 97031]
      }, {
          name: 'Service post-spartum',
          data: [24916, 24064, 29742, 29851, 32490]
      }, {
          name: 'Service pédiatrique',
          data: [11744, 17722, 16005, 19771, 20185]
      }, {
          name: 'Médecine génerale',
          data: [null, null, 7988, 12169, 15112]
      }, {
          name: 'Autres',
          data: [12908, 5948, 8105, 11248, 8989]
      }],
  
      responsive: {
          rules: [{
              condition: {
                  maxWidth: 500
              },
              chartOptions: {
                  legend: {
                      layout: 'horizontal',
                      align: 'center',
                      verticalAlign: 'bottom'
                  }
              }
          }]
      }
  
  }
  }

}
