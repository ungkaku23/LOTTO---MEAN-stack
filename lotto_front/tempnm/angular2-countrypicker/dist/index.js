"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var country_picker_component_1 = require("./src/country-picker.component");
var country_picker_service_1 = require("./src/country-picker.service");
var country_picker_config_1 = require('./src/country-picker.config');
__export(require('./src/country-picker.component'));
__export(require('./src/country-picker.service'));
__export(require('./src/country-picker.config'));
function countryPickerServiceFactory(config, http) {
    return new country_picker_service_1.CountryPickerService(config, http);
}
exports.countryPickerServiceFactory = countryPickerServiceFactory;
var CountryPickerModule = (function () {
    function CountryPickerModule() {
    }
    CountryPickerModule.forRoot = function (providedConfig) {
        if (providedConfig === void 0) { providedConfig = country_picker_config_1.COUNTRY_PICKER_CONFIG_DEFAULT; }
        return {
            ngModule: CountryPickerModule,
            providers: [{
                    provide: country_picker_config_1.COUNTRY_PICKER_CONFIG,
                    useValue: providedConfig
                },
                {
                    provide: country_picker_service_1.CountryPickerService,
                    useFactory: countryPickerServiceFactory,
                    deps: [country_picker_config_1.COUNTRY_PICKER_CONFIG, http_1.Http]
                }]
        };
    };
    CountryPickerModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: [
                country_picker_component_1.CountryPickerComponent
            ],
            exports: [
                country_picker_component_1.CountryPickerComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], CountryPickerModule);
    return CountryPickerModule;
}());
exports.CountryPickerModule = CountryPickerModule;
//# sourceMappingURL=index.js.map