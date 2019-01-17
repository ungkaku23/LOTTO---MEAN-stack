# angular2-countrypicker

**Angular 2 Country Picker - Country selector with Bootstrap support by default, but can be used with any other UI framework (e.g. Ionic or Angular Material)**

[![Build Status](https://travis-ci.org/Paldom/angular2-countrypicker.svg?branch=master)](https://travis-ci.org/Paldom/angular2-countrypicker)
[![npm](https://img.shields.io/npm/v/angular2-countrypicker.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/angular2-countrypicker)

## Credits

Thanks mledoze's [country collection](https://mledoze.github.io/countries/) and [Open Data Commons](http://opendatacommons.org/) for country database.

## Installation

To install this library, run:

```bash
$ npm install angular2-countrypicker --save
```

Then add CountryPickerModule import to your @NgModule in your Angular `AppModule`:

```typescript
// Import angular2-countrypicker library
import { CountryPickerModule } from 'angular2-countrypicker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // Specify angular2-countrypicker library as an import
    CountryPickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**Don't forget to add static countries.json and flag svg assets from mledoze's [country collection](https://mledoze.github.io/countries/)**.
Using angular-cli, static asset import is not yet supported (https://github.com/angular/angular-cli/issues/3555), so please put required data into assets folder
like the [example](http://paldom.github.io/angular2-countrypicker) in the **sample** folder.
You can also specify the location of the assets:

```typescript

  imports: [
    CountryPickerModule.forRoot({
      baseUrl: 'assets/'
    })
  ]

```

## Usage

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
  <!-- You can now use your angular2-countrypicker -->
  <countryPicker></countryPicker>
  <!-- You can also configure picker -->
  <countryPicker [setName]="cca3" [setValue]="ccn2" [flag]="true"></countryPicker>
```

Alternatively you can `CountryPickerService` to get details for each country.

```typescript

  public countries: any[];

  constructor(private countryPickerService: CountryPickerService) {
    this.countryPickerService.getCountries().subscribe(countries => this.countries = countries);
  }
```

```xml

  <md-select name="countrypicker">
    <md-option *ngFor="let c of countries">{{c.capital}}</md-option>
  </md-select>

```

## Parameters

### Component configuration

You can configure component with the following input attributes:

  * `setName: string` - visible name in the country picker
  * `setValue: string` - value to set when an item is selected
  * `flag: boolean` - show flags

### Country model

Example JSON of country models.

```json
{
   "name":{
      "common":"Hungary",
      "official":"Hungary",
      "native":{
         "hun":{
            "official":"Magyarország",
            "common":"Magyarország"
         }
      }
   },
   "tld":[
      ".hu"
   ],
   "cca2":"HU",
   "ccn3":"348",
   "cca3":"HUN",
   "cioc":"HUN",
   "currency":[
      "HUF"
   ],
   "callingCode":[
      "36"
   ],
   "capital":"Budapest",
   "altSpellings":[
      "HU"
   ],
   "region":"Europe",
   "subregion":"Eastern Europe",
   "languages":{
      "hun":"Hungarian"
   },
   "translations":{
      "deu":{
         "official":"Ungarn",
         "common":"Ungarn"
      },
      "fra":{
         "official":"Hongrie",
         "common":"Hongrie"
      },
      "hrv":{
         "official":"Madžarska",
         "common":"Mađarska"
      },
      "ita":{
         "official":"Ungheria",
         "common":"Ungheria"
      },
      "jpn":{
         "official":"ハンガリー",
         "common":"ハンガリー"
      },
      "nld":{
         "official":"Hongarije",
         "common":"Hongarije"
      },
      "por":{
         "official":"Hungria",
         "common":"Hungria"
      },
      "rus":{
         "official":"Венгрия",
         "common":"Венгрия"
      },
      "slk":{
         "official":"Maďarsko",
         "common":"Maďarsko"
      },
      "spa":{
         "official":"Hungría",
         "common":"Hungría"
      },
      "fin":{
         "official":"Unkari",
         "common":"Unkari"
      },
      "zho":{
         "official":"匈牙利",
         "common":"匈牙利"
      }
   },
   "latlng":[
      47,
      20
   ],
   "demonym":"Hungarian",
   "landlocked":true,
   "borders":[
      "AUT",
      "HRV",
      "ROU",
      "SRB",
      "SVK",
      "SVN",
      "UKR"
   ],
   "area":93028
}
```

## Demo

You can check example usage and online demo [here](http://paldom.github.io/angular2-countrypicker).

## Development

To generate all `*.js`, `*.js.map` and `*.d.ts` files:

```bash
$ npm run tsc
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Domonkos Pal](public@dpal.hu)
