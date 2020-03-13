import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WeatherLocation } from '../../models/weather-location';
import { WeatherInfo } from '../../models/weather-info';
import { WeatherInfoService } from '../../services/weather-info.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {

  @Input()
  public location: WeatherLocation;
  @Output()
  private removed = new EventEmitter();

  public info: WeatherInfo;

  constructor(private weatherInfoService: WeatherInfoService, private router: Router) {
    this.info = {
      ts: null, // tiempo de adquisición (milisegundos)
      icon: null, // icono para tiempo
      temp: null, // temperatura
    };
  }

  ngOnInit(): void {
    console.log('[WeatherCardComponent] ngOnInit()');
    this.refresh()
  }

  refresh() {
    console.log('[WeatherCardComponent] refresh()');
    this.weatherInfoService.findCurrentWeather(this.location, (err, info) => {
      this.info = info;
      console.log(info)
    });
  }

  remove() {
    console.log('[WeatherCardComponent] remove()');
    this.removed.emit(this.location);
  }

  showDetails() {
    console.log('[WeatherCardComponent] showDetails()');
    this.router.navigateByUrl(`/details/${this.location.id}`);
  }

  showForecast() {
    console.log('[WeatherCardComponent] showForecast()');
    this.router.navigateByUrl(`/forecast/${this.location.id}`);
  }

}
