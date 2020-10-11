# AdminFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.1.

## NPM
Usted debe ejecutar npm install en la raiz del proyecto

## Assets
Después debe descomprimir la carpeta assets y que todos los archivos queden dentro de la carpeta assets del proyecto. Esto muy importante!!

## Users
Son de tipo: ADMIN_ROLE, ADVUSER_ROLE, USER_ROLE. Después de crear el primer usuario con el software, debe modificar en la base de datos generada con el nombre "polls", el rol de algún usuario en la colección 'users', y poner el rol de ADMIN_ROLE; para poder acceder a todas las funcionalidades. Esto puede hacerlo con MongoCompass o Robo 3T. 

## Funcionamiento del software. 
Ya dentro del software podrá acceder a la gestión de usuarios, perfil, vistas y encuestas. Con el usuario de rol admin puede cambiar el rol de los demás usuarios del sistema, el ADVUSER_ROLE también tendrá acceso a las encuestas y modificarlas

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
