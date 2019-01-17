import {NgModule, ModuleWithProviders, Provider} from "@angular/core";
import {Http, HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import {CountryPickerComponent} from "./src/country-picker.component";
import {CountryPickerService} from "./src/country-picker.service";
import {CountryPickerConfig, COUNTRY_PICKER_CONFIG, COUNTRY_PICKER_CONFIG_DEFAULT} from './src/country-picker.config'

export * from './src/country.interface';
export * from './src/country-picker.component';
export * from './src/country-picker.service';
export * from './src/country-picker.config';

export function countryPickerServiceFactory(config: CountryPickerConfig, http: Http) {
  return new CountryPickerService(config, http);
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CountryPickerComponent
  ],
  exports: [
    CountryPickerComponent
  ]
})
export class CountryPickerModule {
  static forRoot(providedConfig: CountryPickerConfig = COUNTRY_PICKER_CONFIG_DEFAULT): ModuleWithProviders {
    return {
      ngModule: CountryPickerModule,
      providers: [{
        provide: COUNTRY_PICKER_CONFIG,
        useValue: providedConfig
      },
      {
        provide: CountryPickerService,
        useFactory: countryPickerServiceFactory,
        deps: [COUNTRY_PICKER_CONFIG, Http]
      }]
    };
  }
}
