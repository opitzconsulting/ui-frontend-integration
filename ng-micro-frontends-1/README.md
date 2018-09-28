# ng-micro-frontends-1

Prototyp to show, how you can build an Angular Micro Application by using Angular Elements.

## first steps

1. Install all dependencies by using `install-all.sh`.
2. Build all projects by using `build-all.sh`.
3. Start Node Servers by using `start-server.sh`.
4. Open your browser and go to `http://localhost:8000`

## development features

You can avoid starting a specific modul server by passing the `--develop` argument with the module name:

```
./start-server.sh --develop product
```

Then you can manually start the module server with the printed commands.

For frontend development, you can use live server functionalities. To do this, avoid starting the modul server by passing the `--development` argument and additional the `--live-server-argument`. For the `--live-server-argument`, you have to pass the port of the live server (e.g. 4200).

```
./start-server.sh --develop product --live-server-port 4200
```

After this, you have to start the modul server with `--static-server-port` argument. Keep in mind, the port must be the same with the live server port.

```
./product/runtime/node index.js --static-server-port 4200
```

When file changes are detected, the application is re-started automatically. Please note, this will only work in evergreen browsers. In the browsers console, there will be some error messages. This messages could be ignored.

## adding a new module

At first, you have to create the folder structure in the root folder. Create a folder with the name of the new module. In this folder, create a `runtime` and a `source` folder.

### create your frontend module

Then you can create your Angular Project in the `source` folder.

```
ng new [module-name]
```

Go to the module root folder and run the following commands:

```
npm uninstall @angular-devkit/build-angular
npm install @angular/elements @webcomponents/custom-elements
npm install --save-dev ngx-build-plus webpack
```

Then open the `package.json` file and change the following parts:

```
"scripts": {
  "build": "ng build --prod --output-hashing none && node ./../../../scripts/fix-module-style/index.js [module-name]"
}
```

To use the Angular version 7, you have to change a few dependencies. Each dependency, which starts with `@angular/*` must be set to `^7.0.0-beta.0`. The `typescript` dependency must be set to `^3.0.0`. After this, you have to re-install your dependencies by using `npm install`.

Then open the `angular.json` file and change the following parts:
For _build_ set the following entries:

```
"builder": "ngx-build-plus:build",
"outputPath": "./../../runtime/static"
```

For _serve_ set the following entries:

```
"builder": "ngx-build-plus:dev-server"
```

After this, you have to create a new file `webpack.extra.json` next to the `package.json` file. Copy the following content in this new file:

```
module.exports = {
  externals: {
    rxjs: 'rxjs',
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/platform-browser': 'ng.platformBrowser',
    '@angular/elements': 'ng.elements'
  }
};
```

Lets start in the source of the new module. Delete all files, which starts with `app.component.*`. Also you have to delete dependencies in the `app.module.ts`. In this file, you have to change the `bootstrap` item to `entryComponents`. Furthermore, make sure the following imports are declared:

```
import { BrowserModule } from "@angular/platform-browser";
import { Injector, NgModule } from "@angular/core";
import { createCustomElement } from "@angular/elements";
```

After this, you can create your module root component:

```
ng gernerate component my-root
```

Add this new component to the `entryComponents` array in `app.module.ts`:

```
@NgModule({
  entryComponents: [MyRootComponent]
})
```

Only two steps left here. Override the constructor of the AppModule:

```
constructor(private injector: Injector) {
    customElements.define(
      "my-root-element",
      createCustomElement(MyRootComponent, { injector })
    );
  }
```

Then you also have to override the `ngDoBootstrap` method with an empty implementation:

```
ngDoBootstrap(){}
```

You're done, you can test it by using the build command:

```
npm run build
```

### create your node server

In your `runtime` folder, add an `index.js` with the following contents:

```
const utils = require("./../../common/node.js/utils");
const app = utils.startModuleServer(
  "localhost",       // your hostname
  8000,              // port for the root server
  "my-root",         // name of the new module
  8002,              // port of the module server
  "my-root-element", // name of the module root element, this you've declared in app.module.ts.
  "My Root"          // Description for the module
);
```

You're done, restart your servers.

## important notes

### Angular 7 beta

This prototype was developped for Angular 7 by using the beta versions. It should work with older version too, like 6.2. In this case, you have to use other dependency versions.

### view encapsulation

In the current Angular versions is a bug: [see on github.com](https://github.com/angular/angular/issues/16676)

When using multiple angular applications there will be no view encapsulation between these apps. Yes, you could use a native view encapsulation, but this will not work in older browser without shadow dom implementations. Currently Angular only uses numbers to encapsulate components within one single app. To fix this, the `fix-module-style` script will be executed after each productive build for the modules. Keep in mind, when using a live server this may not work correctly.

When the bug is solved, the `fix-module-style` script can be removed.
