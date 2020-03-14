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

  constructor(private routeLocation:Location, private route:ActivatedRoute, 
    private storeService:StoreService, private weatherInfoService: WeatherInfoService ) {
    this.info = {
      ts: null, // tiempo de adquisición (milisegundos)
      desc: null, // descripción tiempo
      icon: null, // icono para tiempo
      temp: null, // temperatura
      temp_max: null, // temperatura máxima
      temp_min: null, // temperatura mínima
      clouds: null, // % de nubes
      humidity: null, // % humedad
      pressure: null, // presión
      wind: null, // velocidad viento
      rain1h: null, // mm de lluvia por m2 a la hora
      rain3h: null, // mm de lluvia por m2 en 3h
      snow1h: null, // mm de nieve por m2 a la hora
      snow3h: null // mm de nieve por m2 en 3h
    };
  }

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


