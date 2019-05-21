import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as io from 'socket.io-client';

import { Application } from './models/Application';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // reference to the client websocket
  private socket;

  apps: Application[] = [];
  scripts: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadApps('product');
    addEventListener('root:show:product', () => this.showAppByName('product'));
    addEventListener('root:show:basket', () => this.showAppByName('basket'));
    addEventListener('root:show:payment', () => this.showAppByName('payment'));
    // initialize application socket handling
    this.initAppSocket();
  }

  /**
   * initializes application socket handling
   */
  public initAppSocket(): void {
    // connect websocket to the root server
    this.socket = io('http://localhost:8000');
    // when app registration message received (registrated / unregistrated)
    this.socket.on('app-registration', (data: any) => {
      console.log(`SocketInfo: ${data.app} ${data.action}`);
      // reload available applications
      this.loadApps();
    });
  }

  public loadApps(startApp?: string): void {
    this.http.get('http://localhost:8000/api/apps').subscribe((data: any) => {
      this.apps = data.apps;
      if (startApp) {
        const start = this.apps.find(app => app.name === startApp);
        if (start) {
          this.showApp(start);
        }
      }
    });
  }

  public showAppByName(appName: string): void {
    const app = this.apps.find(a => a.name === appName);
    if (app) {
      this.showApp(app);
    }
  }

  public showApp(app: Application): void {
    const url = `http://${app.host}:${app.port}/main.js`;
    if (this.scripts.indexOf(url) === -1) {
      const script = document.createElement('script');
      /*if (app.name === "product") {
        script.src = "http://localhost:4200/main.js";
      } else {
        script.src = url;
      }*/
      script.src = url;
      document.body.appendChild(script);
      this.scripts.push(url);
    }
    // hide all apps
    const parent = document.querySelector('#root-application > main') as HTMLMainElement;
    const children = parent.children;

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < children.length; ++i) {
      if (!children[i].classList.contains('hidden')) {
        children[i].classList.add('hidden');
      }
    }
    // check if app is already inserted
    const elem = parent.querySelector(app.element);
    if (elem) {
      elem.classList.remove('hidden');
      // important, when app is shown again, app must reload properties from storage
      dispatchEvent(new CustomEvent(app.name + ':init', {}));
    } else {
      const newElement = document.createElement(app.element);
      parent.appendChild(newElement);
    }
  }
}
