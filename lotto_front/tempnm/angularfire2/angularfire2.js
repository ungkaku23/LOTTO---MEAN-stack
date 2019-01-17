import * as firebase from 'firebase';
import * as utils from './utils';
import { FirebaseConfig, FirebaseApp, WindowLocation, FirebaseUserConfig, FirebaseAuthConfig, FirebaseAppName } from './tokens';
import { Inject, Injectable, NgModule } from '@angular/core';
import { FirebaseSdkAuthBackend, AngularFireAuth, firebaseAuthConfig, AuthBackend, AuthMethods, AuthProviders } from './auth/index';
import { FirebaseListObservable, FirebaseObjectObservable, FirebaseListFactory, FirebaseObjectFactory, AngularFireDatabase } from './database/index';
export var AngularFire = (function () {
    function AngularFire(firebaseConfig, auth, database) {
        this.firebaseConfig = firebaseConfig;
        this.auth = auth;
        this.database = database;
    }
    AngularFire.decorators = [
        { type: Injectable },
    ];
    AngularFire.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [FirebaseConfig,] },] },
        { type: AngularFireAuth, },
        { type: AngularFireDatabase, },
    ]; };
    return AngularFire;
}());
export function _getFirebase(config, appName) {
    try {
        if (appName) {
            return firebase.initializeApp(config, appName);
        }
        else {
            return firebase.initializeApp(config);
        }
    }
    catch (e) {
        return firebase.app(null);
    }
}
export function _getWindowLocation() {
    return window.location;
}
export function _getAuthBackend(app) {
    return new FirebaseSdkAuthBackend(app);
}
export function _getDefaultFirebase(config) {
    config.databaseURL = utils.stripTrailingSlash(config.databaseURL);
    return config;
}
export var COMMON_PROVIDERS = [
    {
        provide: FirebaseApp,
        useFactory: _getFirebase,
        deps: [FirebaseConfig, FirebaseAppName]
    },
    AngularFireAuth,
    AngularFire,
    AngularFireDatabase
];
export var FIREBASE_PROVIDERS = [
    COMMON_PROVIDERS,
    {
        provide: AuthBackend,
        useFactory: _getAuthBackend,
        deps: [FirebaseApp]
    },
    {
        provide: WindowLocation,
        useFactory: _getWindowLocation
    },
];
export var defaultFirebase = function (config) {
    return [
        { provide: FirebaseUserConfig, useValue: config },
        { provide: FirebaseConfig, useFactory: _getDefaultFirebase, deps: [FirebaseUserConfig] }
    ];
};
export var AngularFireModule = (function () {
    function AngularFireModule() {
    }
    AngularFireModule.initializeApp = function (config, authConfig, appName) {
        return {
            ngModule: AngularFireModule,
            providers: [
                { provide: FirebaseUserConfig, useValue: config },
                { provide: FirebaseConfig, useFactory: _getDefaultFirebase, deps: [FirebaseUserConfig] },
                { provide: FirebaseAuthConfig, useValue: authConfig },
                { provide: FirebaseAppName, useValue: appName }
            ]
        };
    };
    AngularFireModule.decorators = [
        { type: NgModule, args: [{
                    providers: FIREBASE_PROVIDERS
                },] },
    ];
    AngularFireModule.ctorParameters = function () { return []; };
    return AngularFireModule;
}());
export { AngularFireAuth, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable, FirebaseListFactory, FirebaseObjectFactory, firebaseAuthConfig, AuthMethods, AuthProviders, WindowLocation };
export { FirebaseConfig, FirebaseApp, FirebaseAuthConfig, FirebaseRef, FirebaseUrl, FirebaseUserConfig } from './tokens';
//# sourceMappingURL=angularfire2.js.map