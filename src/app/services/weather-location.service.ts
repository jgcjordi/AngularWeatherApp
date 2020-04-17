import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherLocation } from '../models/weather-location';

@Injectable({
  providedIn: 'root'
})
export class WeatherLocationService {
  private key = '231d0f5c8558fe1d071df1af9ff915f3';
  private url = `https://api.openweathermap.org/data/2.5/weather`;
  constructor(private http: HttpClient) { }
  findLocation(desc: string,
    cb: (err: Error, locations: WeatherLocation[]) => void): void {
    console.log(`[WeatherLocationService] findLocation(${desc}`);
    this.http.get<any>(this.url, {
      params: { APPID: this.key, q: desc }
    })
      .subscribe(
        (info) => {
          console.log('[WeatherLocationService] findLocation() success.');
          if (info) {
            cb(null, [{
              id: info.id,
              lat: info.coord.lat,
              lon: info.coord.lon,
              name: info.name,
              country: info.sys.country
            }]);
          } else {
            cb(null, []);
          }
        },
        (err) => {
          console.log(err);
          cb(err, null);
        }
      );
  }
}

