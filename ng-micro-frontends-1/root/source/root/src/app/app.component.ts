import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Application } from "./models/Application";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "app";

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadApps();
  }

  apps: Application[] = [];
  scripts: String[] = [];

  public loadApps() {
    this.http.get("http://localhost:8000/api/apps").subscribe((data: any) => {
      this.apps = data.apps;
    });
  }

  public addApp(app: Application) {
    const url = `http://${app.host}:${app.port}/main.js`;
    if (this.scripts.indexOf(url) == -1) {
      const script = document.createElement("script");
      script.src = url;
      document.body.appendChild(script);
      this.scripts.push(url);
    }
    const parent = document.querySelector("#root-application");
    const elem = document.createElement(app.element);
    parent.appendChild(elem);
  }

  public loadProducts() {
    const url = "http://localhost:8001/main.js";
    if (this.scripts.indexOf(url) == -1) {
      const script = document.createElement("script");
      script.src = url;
      document.body.appendChild(script);
      this.scripts.push(url);
    }
    const parent = document.querySelector("#root-application");
    const elem = document.createElement("product-element");
    parent.appendChild(elem);
  }

  public loadBasket() {
    const url = "http://localhost:8002/main.js";
    if (this.scripts.indexOf(url) == -1) {
      const script = document.createElement("script");
      script.src = url;
      document.body.appendChild(script);
      this.scripts.push(url);
    }
    const parent = document.querySelector("#root-application");
    const elem = document.createElement("basket-element");
    parent.appendChild(elem);
  }

  public loadPayment() {
    const url = "http://localhost:8003/main.js";
    if (this.scripts.indexOf(url) == -1) {
      const script = document.createElement("script");
      script.src = url;
      document.body.appendChild(script);
      this.scripts.push(url);
    }
    const parent = document.querySelector("#root-application");
    const elem = document.createElement("payment-element");
    parent.appendChild(elem);
  }
}
