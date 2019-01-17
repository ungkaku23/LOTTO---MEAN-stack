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
var core_1 = require('@angular/core');
var _ = require('lodash');
var country_picker_service_1 = require('./country-picker.service');
var CountryPickerComponent = (function () {
    function CountryPickerComponent(countryPickerService) {
        var _this = this;
        this.countryPickerService = countryPickerService;
        this.flag = false;
        this.setValue = 'cca3';
        this.setName = 'name.common';
        this.baseUrl = '';
        this.countryPickerService.getCountries().subscribe(function (countries) {
            _this.countries = countries.sort(function (a, b) {
                var na = _this.getName(a);
                var nb = _this.getName(b);
                if (na > nb) {
                    return 1;
                }
                if (na < nb) {
                    return -1;
                }
                return 0;
            });
        });
        this.baseUrl = countryPickerService.baseUrl + "data/";
    }
    CountryPickerComponent.prototype.getValue = function (obj) {
        return _.get(obj, this.setValue);
    };
    CountryPickerComponent.prototype.getName = function (obj) {
        return _.get(obj, this.setName);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CountryPickerComponent.prototype, "flag", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CountryPickerComponent.prototype, "setValue", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CountryPickerComponent.prototype, "setName", void 0);
    CountryPickerComponent = __decorate([
        core_1.Component({
            selector: 'countryPicker',
            template: "<select class=\"form-control form-control-sm\">\n                <option *ngFor=\"let c of countries; let i = index;\" [value]=\"getValue(c)\"><img [hidden]=\"!flag\" src=\"{{baseUrl + c.cca3}}.svg\">{{getName(c)}}</option>\n            </select>"
        }), 
        __metadata('design:paramtypes', [country_picker_service_1.CountryPickerService])
    ], CountryPickerComponent);
    return CountryPickerComponent;
}());
exports.CountryPickerComponent = CountryPickerComponent;
//# sourceMappingURL=country-picker.component.js.map