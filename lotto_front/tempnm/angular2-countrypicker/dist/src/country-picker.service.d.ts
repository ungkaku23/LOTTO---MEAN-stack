import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { CountryPickerConfig } from './country-picker.config';
import { ICountry } from './country.interface';
export declare class CountryPickerService {
    private config;
    private http;
    private dataUrl;
    private data;
    baseUrl: string;
    constructor(config: CountryPickerConfig, http: Http);
    private loadData();
    private handleError(error);
    getCountries(): Observable<ICountry[]>;
}
