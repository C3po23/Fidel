import {AlertController, NavController} from 'ionic-angular';
import {Component} from '@angular/core';
import {ClientService} from '../../services/client';
import {FidelPage} from '../fidel/fidel';


@Component({
    templateUrl: 'client.html',
    providers: [ClientService]
})

export class ClientPage {
    public foundClient;
    public username;

    constructor(public alertCtrl: AlertController, private client: ClientService, private nav: NavController) {
        this.client.getClientAll().subscribe(
            data => {
                this.foundClient = data.json();
            },
            err => console.error(err),
            () => console.log('getRepos completed')
        );
    }

    getClient(ev) {
        console.log(ev.target.value);
        this.username = ev.target.value;
        if (ev.target.value) {
            this.client.getClientByName(this.username).subscribe(
                data => {
                    this.foundClient = data.json();
                },
                err => console.error(err),
                () => console.log('getRepos completed')
            );
            console.log(this.username);
        } else {
            this.client.getClientAll().subscribe(
                data => {
                    this.foundClient = data.json();
                },
                err => console.error(err),
                () => console.log('getRepos completed')
            );
        }
    }

    doAlert(e) {
        let alert = this.alertCtrl.create({
            title: 'New Friend!' + this.username,
            message: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
            buttons: ['Ok']
        });
        alert.present();
    }

    goToFidel(e,ID) {
        console.log("repo.username"+ID);
        this.nav.push(FidelPage, { me: ID });
    }

}
