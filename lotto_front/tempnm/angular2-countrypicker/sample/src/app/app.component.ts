import { Component } from '@angular/core';
import { CountryPickerService } from 'angular2-countrypicker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular2-countrypicker';

  public countries: any[];

  constructor(private countryPickerService: CountryPickerService) {
    this.countryPickerService.getCountries().subscribe(countries => this.countries = countries);
  }

}
