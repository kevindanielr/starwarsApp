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
            {label: 'Films', icon: 'pi pi-bookmark', routerLink: ['/films']},
            {label: 'Characters', icon: 'pi pi-calendar-times', routerLink: ['/characters']},
        ];
    }
}
