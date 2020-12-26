import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Components
import {AppComponent} from './app.component';
import {HeaderComponent} from './navigation/header/header.component';
import {SidenavListComponent} from './navigation/sidenav-list/sidenav-list.component';
import {GameHomeComponent} from './game/game-home/game-home.component';
import {ConsoleHomeComponent} from './console/console-home/console-home.component';
import {PublisherHomeComponent} from './publisher/publisher-home/publisher-home.component';
import {GenreHomeComponent} from './genre/genre-home/genre-home.component';
import {GameDetailComponent} from './game/game-detail/game-detail.component';
import {GenreEditComponent} from './genre/genre-edit/genre-edit.component';
import {NavigationHomeComponent} from './navigation/navigation-home/navigation-home.component';
import {PublisherEditComponent} from './publisher/publisher-edit/publisher-edit.component';
import {ConsoleEditComponent} from './console/console-edit/console-edit.component';
import { GameEditComponent } from './game/game-edit/game-edit.component';
import { SettingsHomeComponent } from './settings/settings-home/settings-home.component';
import { EngineEditComponent } from './settings/engine-edit/engine-edit.component';
import { MediumEditComponent } from './settings/medium-edit/medium-edit.component';
import { GameModeEditComponent } from './settings/game-mode-edit/game-mode-edit.component';
// Modules
import {RoutingModule} from './routing/routing.module';
import {MaterialModule} from './_sharedModules/material/material.module';
import {SyncfusionModule} from './_sharedModules/syncfusion/syncfusion.module';
import {ThirdPartyModule} from './_sharedModules/third-party/third-party.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    GameHomeComponent,
    ConsoleHomeComponent,
    PublisherHomeComponent,
    GenreHomeComponent,
    GameDetailComponent,
    GenreEditComponent,
    NavigationHomeComponent,
    PublisherEditComponent,
    ConsoleEditComponent,
    GameEditComponent,
    SettingsHomeComponent,
    EngineEditComponent,
    MediumEditComponent,
    GameModeEditComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    SyncfusionModule,
    ThirdPartyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
