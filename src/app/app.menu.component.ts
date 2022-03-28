import {Component, OnInit} from '@angular/core';
import {AppMainComponent} from './app.main.component';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public appMain: AppMainComponent) {}

    ngOnInit() {
        this.model = [
            {label: 'Films', icon: '../assets/icon/ship.png', routerLink: ['/films']},
            {label: 'Characters', icon: '../assets/icon/chew.png', routerLink: ['/characters']},
        ];
    }
}
