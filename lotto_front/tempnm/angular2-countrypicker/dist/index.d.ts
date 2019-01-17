import { ModuleWithProviders } from "@angular/core";
import { Http } from "@angular/http";
import { CountryPickerService } from "./src/country-picker.service";
import { CountryPickerConfig } from './src/country-picker.config';
export * from './src/country.interface';
export * from './src/country-picker.component';
export * from './src/country-picker.service';
export * from './src/country-picker.config';
export declare function countryPickerServiceFactory(config: CountryPickerConfig, http: Http): CountryPickerService;
export declare class CountryPickerModule {
    static forRoot(providedConfig?: CountryPickerConfig): ModuleWithProviders;
}
