import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { WeatherLocation } from '../../models/weather-location';
import { WeatherInfoService } from '../../services/weather-info.service';
import { StoreService } from '../../services/store.service';
import { WeatherInfo } from 'src/app/models/weather-info';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})

export class WeatherDetailsComponent implements OnInit {
  public location: WeatherLocation;
  public info: WeatherInfo;

  constructor(private routeLocation:Location, private route:ActivatedRoute, private storeService:StoreService, private weatherInfoService: WeatherInfoService ) { }

  ngOnInit(): void {
    console.log('[WeatherDetailsComponent] ngOnInit()');
    let id = Number(this.route.snapshot.paramMap.get('id'));
    this.location = this.storeService.findLocation(id);
    this.refresh()
  }

  refresh() {
    console.log('[WeatherDetailsComponent] refresh()');
    this.weatherInfoService.findCurrentWeather(this.location, (err, info) => {
      this.info = info;
    });
  }

  back() {
    console.log('[SearchLocationComponent] back()');
    this.routeLocation.back();
  }

}


