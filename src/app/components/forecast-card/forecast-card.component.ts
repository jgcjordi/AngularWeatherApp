import { Component, OnInit, Input } from '@angular/core';
import { WeatherInfo } from '../../models/weather-info';

@Component({
  selector: 'app-forecast-card',
  templateUrl: './forecast-card.component.html',
  styleUrls: ['./forecast-card.component.css']
})
export class ForecastCardComponent implements OnInit {
  public day = null
  public month = null
  public nday = null
  public year = null

  @Input()
  public arrayday: WeatherInfo[];

  constructor() {
  }

  ngOnInit(): void {
    if (this.arrayday) {
      let date = new Date(this.arrayday[0].ts * 1000)
      let weekday = new Array(7);
      weekday[0] = "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";
      this.day = weekday[date.getDay()];

      let month = new Array();
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";
      this.month = month[date.getMonth()];

      this.nday = date.getDate()
      this.year = date.getFullYear()
    }
  }

  getTime12h(ts: number): String {
    let date = new Date(ts * 1000)
    let h = date.getHours()
    let am = "AM"
    if (h > 12) {
      h -= 12
      am = "PM"
    }
    return `${h}:00 ${am}`
  }
}
