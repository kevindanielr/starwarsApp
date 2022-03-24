import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import { FilmComponent } from './pages/film/film.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: 'films', component: FilmComponent},
                ]
            },
            {path: 'notfound', component: AppNotfoundComponent},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
