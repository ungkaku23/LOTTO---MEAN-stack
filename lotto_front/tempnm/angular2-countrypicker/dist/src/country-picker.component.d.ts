import { ICountry } from './country.interface';
import { CountryPickerService } from './country-picker.service';
export declare class CountryPickerComponent {
    private countryPickerService;
    flag: boolean;
    setValue: string;
    setName: string;
    countries: ICountry[];
    baseUrl: string;
    constructor(countryPickerService: CountryPickerService);
    getValue(obj: ICountry): {};
    getName(obj: ICountry): {};
}
