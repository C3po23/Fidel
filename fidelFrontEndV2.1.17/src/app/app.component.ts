import { Component, ViewChild } from '@angular/core';
import { MenuController,Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import{ClientPage}from'../pages/client/client';
import {Nav} from 'ionic-angular';
import {FidelPage} from '../pages/fidel/fidel';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav:Nav;
  rootPage = ClientPage;

  constructor(private menu: MenuController,platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

    goToHome(e) {
        this.nav.setRoot(ClientPage);
        this.menu.close();
    }

    goToFidel(e) {
        console.log("goToFidel");
        this.nav.setRoot(FidelPage);
        this.menu.close();
    }

    openPage(page) {
      // Reset the nav controller to have just this page
      // we wouldn't want the back button to show in this scenario
      console.log("blabla");
      console.log(page);
      this.rootPage = page;

      // close the menu when clicking a link from the menu
      this.menu.close();
    }

}
