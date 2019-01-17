import { InjectionToken } from '@angular/core';

export let COUNTRY_PICKER_CONFIG = new InjectionToken('countrypicker.config');

export interface CountryPickerConfig {
    baseUrl: string,
}

export const COUNTRY_PICKER_CONFIG_DEFAULT: CountryPickerConfig = {
    baseUrl: "assets/"
};