import { Injectable } from '@angular/core';
import { WeatherLocation } from '../models/weather-location';
import { WeatherInfo } from '../models/weather-info';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherInfoService {
  private key = '231d0f5c8558fe1d071df1af9ff915f3';
  private url = `http://api.openweathermap.org/data/2.5/weather`;
  constructor(private http: HttpClient) { }
  findCurrentWeather(location: WeatherLocation, cb: (err: Error, weatherInfo: WeatherInfo) => void): void {
    console.log(`[WeatherInfoService] findCurrentWeather(${location}`);

    this.http.get<any>(this.url, {
      params: { appid: this.key, id: location.id.toString(), units: "metric" }
    })
      .subscribe(
        (info) => {
          console.log('[WeatherLocationService] findLocation() success.');
          if (info) {
            let weatherInfo = {
              ts: info.dt, // tiempo de adquisición (milisegundos)
              desc: null, // descripción tiempo
              icon: null, // icono para tiempo
              temp: info.main.temp, // temperatura
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
            if (info.weather) {
              if (info.weather[0].main) weatherInfo.desc = info.weather[0].main
              if (info.weather[0].icon) weatherInfo.icon = info.weather[0].icon
            }
            if (info.main) {
              if (info.main.temp_max) weatherInfo.temp_max = info.main.temp_max
              if (info.main.temp_min) weatherInfo.temp_min = info.main.temp_min
              if (info.main.humidity) weatherInfo.humidity = info.main.humidity
              if (info.main.pressure) weatherInfo.pressure = info.main.pressure
            }
            if (info.clouds.all) weatherInfo.clouds = info.clouds.all
            if (info.wind.speed) weatherInfo.wind = info.wind.speed
            if (info.rain) {
              if (info.rain["1h"]) weatherInfo.rain1h = info.rain["1h"]
              if (info.rain["3h"]) weatherInfo.rain3h = info.rain["3h"]
            }
            if (info.snow) {
              if (info.snow["1h"]) weatherInfo.snow1h = info.snow["1h"]
              if (info.snow["3h"]) weatherInfo.snow3h = info.snow["3h"]
            }
            console.log(info)
            cb(null, weatherInfo);
          } else {
            cb(null, null);
          }
        },
        (err) => {
          console.log(err);
          cb(err, null);
        }
      );
  }
  findForecast(location: WeatherLocation, ini: number, end: number,
    cb: (err: Error, forecast: WeatherInfo[]) => void): void {
    console.log(`findForecast(${location.name},${ini},${end})`);
    this.findCurrentWeather(location, (err, info) => {
      if (err) cb(err, null);
      else {
        let forecast: WeatherInfo[] = [];
        for (let i = 0; i < 6; i++) forecast.push(info);
        cb(null, forecast);
      }
    });
  }
}