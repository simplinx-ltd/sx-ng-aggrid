# sx-ng-aggrid
An ag-grid template for easy usage including sample pages & a sample test-server.

![Sample Grid](https://raw.githubusercontent.com/simplinx-ltd/sx-ng-aggrid/main/sample-grid.png)

![Sample Detail](https://raw.githubusercontent.com/simplinx-ltd/sx-ng-aggrid/main/sample-detail.png)

>Frontend : Angular 8 & Ag-grid

>Backend : Sequelize & Express. Check [sx-sequelize-api](https://github.com/simplinx-ltd/sx-sequelize-api)

> This project is using ng-packagr to package library

## Usage Example
```
* cd YOUR_PROJECT
* npm i --save-dev sx-ng-aggrid
* npm i --save-dev ag-grid@^18.0.1 ag-grid-angular@^18.0.1 bootstrap font-awesome moment    --> Install peer dependencies

Edit angular.json & add these lines to styles array
"node_modules/bootstrap/dist/css/bootstrap.css",
"node_modules/ag-grid/dist/styles/ag-grid.css",
"node_modules/ag-grid/dist/styles/ag-theme-fresh.css",
"node_modules/font-awesome/css/font-awesome.css",

Edit app.module.ts
import { GridModule } from 'sx-ng-aggrid';           --> Add import
....
 imports: [
    BrowserModule,
    GridModule
  ],
  ....

Now you are ready
Check test & test-detail components for other usage examples
```

## Build
```
* git clone https://github.com/simplinx-ltd/sx-ng-aggrid.git
* cd sx-ng-aggrid
* npm i
* cd test-server
* npm i
* npm build
* npm run start     --> This will start test-server. Check db config in test-server/config.ts

In another shell
* cd sx-ng-aggrid
* npm run start     --> Start test app

Packaging
* npm run packagr   --> Package App
* cd dist
* npm pack --> This will create sx-ng-aggrid.XX.tgz. 
```

>You can use library from other angular projects like  this;
```
npm install ./sx-ng-aggrid.XX.tgz
```
