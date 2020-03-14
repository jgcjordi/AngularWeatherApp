import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { WeatherLocation } from '../../models/weather-location';
import { WeatherInfo } from '../../models/weather-info';
import { StoreService } from '../../services/store.service';
import { WeatherInfoService } from '../../services/weather-info.service';


@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  public location: WeatherLocation;
  public arrayDaysForecast = []

  constructor(private routeLocation: Location, private route: ActivatedRoute,
    private storeService: StoreService, private weatherInfoService: WeatherInfoService) { }

  ngOnInit(): void {
    console.log('[ForecastComponent] ngOnInit()');
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.location = this.storeService.findLocation(id);
    this.refresh()
  }

  refresh() {
    console.log('[WeatherDetailsComponent] refresh()');
    this.weatherInfoService.findForecast(this.location, (err, info) => {
      let auxArrayDaysForecast = []
      let firstDate = new Date(info[0].ts * 1000)
      let firstDay = firstDate.getDate()
      let auxArrayDayInfoForecast: WeatherInfo[] = []
      info.forEach(element => {
        let date = new Date(element.ts * 1000)
        let day = date.getDate()
        if (day == firstDay) {
          auxArrayDayInfoForecast.push(element)
        } else {
          auxArrayDaysForecast.push(auxArrayDayInfoForecast)
          firstDay += 1
          auxArrayDayInfoForecast = []
          auxArrayDayInfoForecast.push(element)
        }
      });
      auxArrayDaysForecast.push(auxArrayDayInfoForecast)
      this.arrayDaysForecast = auxArrayDaysForecast
      console.log(this.arrayDaysForecast)
    });
    
  }

  back() {
    console.log('[SearchLocationComponent] back()');
    this.routeLocation.back();
  }

}
