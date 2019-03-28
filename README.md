

# About Askme

AskMe is the pet project with Angular front-end connected to Wordpress on it's back-end using WP REST API. It supports creating posts, comments, users. User registration, authorization with JSON Web Tokens Auth. 

This project also use [Angular Editor](https://www.npmjs.com/package/@kolkov/angular-editor) wysiwyg editor.

Demo is here [AskMe](https://angular.perun.top/system/questions) and 
[WP Server side](https://wp.perun.top/)


## AskMe How To

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.7.
This project needs Wordpress v4.9.10^ as server side with next installed plugins:
1. [JWT Authentication for WP-API](https://ru.wordpress.org/plugins/jwt-authentication-for-wp-rest-api/) -  you need to complete all requirements in the description of this plugin.
2. [User Profile Picture](https://wordpress.org/plugins/metronet-profile-picture/) - it needs for the custom profile pictures.

To connect your Wordpress to this project you need to edit *src/app/system/shared/services/global.ts* file. Add your WP REST API link in **href** variable and base link to your Wordpress in **hrefBase** variable.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
"# AskMeWP" 
