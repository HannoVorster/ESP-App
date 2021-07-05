import { Component, OnInit } from '@angular/core';
import { Weather } from 'src/app/models/weather';
import { RestApiService } from 'src/app/services/rest-api.service';

import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  WeatherData: any = [];

  currentTemp: string = "";
  currentHumidity: string = "";

  // Historical Data...
  chartType: string = "line";
  chartLabels: string[] = [];
  chartTemperature: string[] = [];
  chartHumidity: string[] = [];

  // Temo & Humidity Data...
  allData = {};
  tempData = {};
  humidityData = {};

  temp24Data = {};
  humidity24Data = {};

  temp7DayData = {};
  humidity7DayData = {};

  temp1MonthData = {};
  humidity1MonthData = {}; 

  // 24 Hour Data...
  chart24Labels: string[] = [];  
  chartTemp24Hour: string[] = [];
  chartHumidity24Hour: string[] = [];

  // 7 Days Data...
  chart7DayLabels: string[] = [];
  chartTemp7Day: string[] = [];
  chartHumidity7Day: string[] = [];

  // 1 Month Data...
  chart1MonthLabels: string[] = [];
  chartTemp1Month: string[] = [];
  chartHumidity1Month: string[] = [];

  // Moment Date:
  //last24Hours: moment.Moment = moment().subtract(1, "day");

  // Chart.js options...
  options = {
    scales: {
      yAxes: [{
        ticks: {
            beginAtZero: true
        }
      }]
    },
    responsive: true,
    maintainAspectRatio: true
  };

  //Datatables...
  dtOptions: DataTables.Settings = {};

  constructor(private restApi: RestApiService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.restApi.getWeatherData().subscribe((data: {}) => {
      this.WeatherData = data;

      this.currentTemp = this.WeatherData[this.WeatherData.length-1].temp;
      this.currentHumidity = this.WeatherData[this.WeatherData.length-1].humidity;

      for (let elem of this.WeatherData)
      {
        this.chartLabels.push(elem.datetime);
        this.chartTemperature.push(elem.temp);
        this.chartHumidity.push(elem.humidity);

        if (moment(elem.datetime).diff(moment().subtract(1, "day")) > 0 ) {
          this.chartTemp24Hour.push(elem.temp);
          this.chartHumidity24Hour.push(elem.humidity);
          this.chart24Labels.push(elem.datetime);
        }

        if (moment(elem.datetime).diff(moment().subtract(7, "day")) > 0 ) {
          this.chartTemp7Day.push(elem.temp);
          this.chartHumidity7Day.push(elem.humidity);
          this.chart7DayLabels.push(elem.datetime);
        }

        if (moment(elem.datetime).diff(moment().subtract(1, "month")) > 0 ) {
          this.chartTemp1Month.push(elem.temp);
          this.chartHumidity1Month.push(elem.humidity);
          this.chart1MonthLabels.push(elem.datetime);
        }
      }

      this.allData = {
        labels: this.chartLabels,
        datasets: [
          {
            type: 'line',
            label: 'Temperatures',
            data: this.chartTemperature,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false
          },
          {
            type: 'line',
            label: 'Humidity',
            data: this.chartHumidity,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            fill: false
          }
        ]
      }

      this.tempData = {
        labels: this.chartLabels,
        datasets: [
          {
            label: "Temperature Data",
            data: this.chartTemperature,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false
          }
        ]
      };

      this.temp24Data = {
        labels: this.chart24Labels,
        datasets: [
          {
            label: "Temperature Data",
            data: this.chartTemp24Hour,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false
          }
        ]
      };

      this.temp7DayData = {
        labels: this.chart7DayLabels,
        datasets: [
          {
            label: "Temperature Data",
            data: this.chartTemp7Day,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false
          }
        ]
      };

      this.temp1MonthData = {
        labels: this.chart1MonthLabels,
        datasets: [
          {
            label: "Temperature Data",
            data: this.chartTemp1Month,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false
          }
        ]
      };

      this.humidityData = {
        labels: this.chartLabels,
        datasets: [
          {
            label: "Humidity Data",
            data: this.chartHumidity,
            backgroundColor:'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            fill: false
          }
        ]
      };

      this.humidity24Data = {
        labels: this.chart24Labels,
        datasets: [
          {
            label: "Humidity Data",
            data: this.chartHumidity24Hour,
            backgroundColor:'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            fill: false
          }
        ]
      };

      this.humidity7DayData = {
        labels: this.chart7DayLabels,
        datasets: [
          {
            label: "Humidity Data",
            data: this.chartHumidity7Day,
            backgroundColor:'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            fill: false
          }
        ]
      };
      
      this.humidity1MonthData = {
        labels: this.chart1MonthLabels,
        datasets: [
          {
            label: "Humidity Data",
            data: this.chartHumidity1Month,
            backgroundColor:'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            fill: false
          }
        ]
      };
    });

    this.dtOptions = {
      ajax: {
        'url': 'https://hannovorster.co.za/getweather.php',
        //'url': 'http://localhost/ESP-Backend/getweather.php',
        'type': 'GET',
        'dataSrc': ""
      },
      order: [[0, 'desc']],
      columns: [
        {
          title: 'ID',
          data: 'id'
        }, 
        {
          title: 'Temp',
          data: 'temp',
          render: function (data, type, row, meta) {
            return `${data}°C`;
          }
        }, 
        {
          title: 'Humidity',
          data: 'humidity',
          render: function (data, type, row, meta) {
            return `${data}%`;
          }
        },
        {
          title: 'Date Time',
          data: 'datetime'
        },
        {
          title: 'Sensor',
          data: 'sensor'
        },
        {
          title: 'User',
          data: 'user'
        }
      ]
    };
  }
}
