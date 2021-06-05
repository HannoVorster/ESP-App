import { Component, OnInit } from '@angular/core';
import { Weather } from 'src/app/models/weather';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  WeatherData: any = [];

  chartType: string = "line";
  chartLabels: string[] = [];
  chartTemperature: string[] = [];
  chartHumidity: string[] = [];

  tempData = {};
  humidityData = {};

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

      for (let elem of this.WeatherData)
      {
        this.chartLabels.push(elem.datetime);
        this.chartTemperature.push(elem.temp);
        this.chartHumidity.push(elem.humidity);
      }

      this.tempData = {
        labels: this.chartLabels,
        datasets: [
          {
            label: "Temperature Data",
            data: this.chartTemperature,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)'
            ],
          }
        ]
      };

      this.humidityData = {
        labels: this.chartLabels,
        datasets: [
          {
            label: "Humidity Data",
            data: this.chartHumidity,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)'
            ],
          }
        ]
      };
    });

    this.dtOptions = {
      ajax: {
        'url': 'https://localhost:443/getweather.php',
        'type': 'GET',
        'dataSrc': ""
      },
      columns: [
        {
          title: 'ID',
          data: 'id'
        }, 
        {
          title: 'Temp',
          data: 'temp'
        }, 
        {
          title: 'Humidity',
          data: 'humidity'
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
