import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {GameHomeComponent} from '../game/game-home/game-home.component';
import {ConsoleHomeComponent} from '../console/console-home/console-home.component';
import {PublisherHomeComponent} from '../publisher/publisher-home/publisher-home.component';
import {GenreHomeComponent} from '../genre/genre-home/genre-home.component';
import {SettingsHomeComponent} from '../settings/settings-home/settings-home.component';

const routes: Routes = [
  { path: '', redirectTo: '/game', pathMatch: 'full'},
  { path: 'game', component: GameHomeComponent},
  { path: 'konsolen', component: ConsoleHomeComponent},
  { path: 'konsolen/:plattform', component: ConsoleHomeComponent},
  { path: 'publisher', component: PublisherHomeComponent},
  { path: 'publisher/:publisher', component: PublisherHomeComponent},
  { path: 'genre', component: GenreHomeComponent},
  { path: 'genre/:genre', component: GenreHomeComponent},
  { path: 'settings', component: SettingsHomeComponent},
  { path: '**', redirectTo: '/game', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
