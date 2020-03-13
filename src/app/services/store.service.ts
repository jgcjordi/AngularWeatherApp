import { Injectable } from '@angular/core';
import { WeatherLocation } from '../models/weather-location';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private locations: WeatherLocation[] = [];
  constructor() {
    this.getArrayLocationsFromBrowserStorage()
  }
  addLocation(location: WeatherLocation): void {
    console.log(`[StoreService] addLocation(${location.name}`);
    this.locations.push(location);
    this.saveArrayLocationsInBrowserStorage()
  }
  removeLocation(id: number): void {
    console.log(`[StoreService] removeLocation(${id})`);
    let index = this.locations.findIndex((location => location.id === id));
    if (index !== -1) this.locations.splice(index, 1);
    this.saveArrayLocationsInBrowserStorage()
  }
  listLocations(): WeatherLocation[] {
    console.log(`[StoreService] listLocation()`);
    return this.locations;
  }
  findLocation(id: number): WeatherLocation {
    console.log(`[StoreService] findLocation(${id})`);
    let index = this.locations.findIndex((location => location.id === id));
    if (index !== -1) return this.locations[index];
    else return null;
  }

  getArrayLocationsFromBrowserStorage(){
    if (localStorage.getItem('locations'))
    this.locations = JSON.parse(localStorage.getItem('locations'));
  }
  saveArrayLocationsInBrowserStorage(){
    localStorage.setItem('locations', JSON.stringify(this.locations));
  }
}
