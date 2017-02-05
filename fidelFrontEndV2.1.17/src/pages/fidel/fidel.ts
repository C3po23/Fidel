import {NavParams} from 'ionic-angular';
import {Component} from '@angular/core';

@Component({
    templateUrl: 'fidel.html',
})


export class FidelPage {
    private you;
    private me;

    constructor(navParams: NavParams) {
        this.you = "test";
        console.log(this.you);
        this.me=navParams.get('me');
    }
}
