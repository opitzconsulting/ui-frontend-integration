# Adding a new microservice

1. ng generate application shopping-cart --enableIvy=true
2. update the angular.json. Find the configuration of the new application and modify these keys:
    "architect": {
        "build": {
          "builder": "ngx-build-plus:browser",
            ...
        },
        ...
        "serve": {
          "builder": "ngx-build-plus:dev-server",
          ...
    }

2. cd projects/shopping-cart
3. mkdir server
4. mkdir server/static
5. add a server file. It's called index.js and is stored in the "server" folder:

    const utils = require('./../../common/utils');
    const app = utils.startModuleServer(
      "localhost",
      8000,
      "shopping-cart",
      8002,
      "shopping-cart-element",
      "Shopping Cart"
    );

5. modify the app.module:

    @NgModule({
      declarations: [BasketRootComponent, BasketListComponent],
      imports: [BrowserModule],
      providers: [],
      entryComponents: [BasketRootComponent]
    })
    export class AppModule {
      constructor(private injector: Injector) {}

      ngDoBootstrap() {
        const cartComponent = createCustomElement(BasketRootComponent, { injector: this.injector });
        customElements.define('shopping-cart-element', cartComponent);
        console.log('Custom element <shopping-cart-element> available');
      }
    }

6. Add the scripts build:cart, postbuild:cart, and start:cart to the package.json of the root project. Basically, they are a copy of the other build:xxx and start:xxx scripts.
7. Add the script call to the scripts build and start in the package.json.
8. *Important*: the microservices don't use zone.js. You need to trigger change detection yourself on every asynchronous event:
     constructor(private app: ApplicationRef) {}
     ...
     this.app.tick(); // triggers change detection
