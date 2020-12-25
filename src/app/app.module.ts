import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {HeaderComponent} from './navigation/header/header.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SidenavListComponent} from './navigation/sidenav-list/sidenav-list.component';
import {RoutingModule} from './routing/routing.module';
import {GameHomeComponent} from './game/game-home/game-home.component';
import {ConsoleHomeComponent} from './console/console-home/console-home.component';
import {PublisherHomeComponent} from './publisher/publisher-home/publisher-home.component';
import {GenreHomeComponent} from './genre/genre-home/genre-home.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {
  EditService,
  FilterService,
  GridModule,
  GroupService,
  PageService,
  SortService,
  ToolbarService
} from '@syncfusion/ej2-angular-grids';
import {GameDetailComponent} from './game/game-detail/game-detail.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {GenreEditComponent} from './genre/genre-edit/genre-edit.component';
import {NgxScrollTopModule} from 'ngx-scrolltop';
import {NavigationHomeComponent} from './navigation/navigation-home/navigation-home.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ToastrModule} from 'ngx-toastr';
import {PublisherEditComponent} from './publisher/publisher-edit/publisher-edit.component';
import {ConsoleEditComponent} from './console/console-edit/console-edit.component';
import {DatePickerModule} from '@syncfusion/ej2-angular-calendars';
import {MatMenuModule} from '@angular/material/menu';
import { GameEditComponent } from './game/game-edit/game-edit.component';
import { SettingsHomeComponent } from './settings/settings-home/settings-home.component';
import { EngineEditComponent } from './settings/engine-edit/engine-edit.component';
import { MediumEditComponent } from './settings/medium-edit/medium-edit.component';
import { GameModeEditComponent } from './settings/game-mode-edit/game-mode-edit.component';


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
    MatToolbarModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    RoutingModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    GridModule,
    MatDialogModule,
    MatChipsModule,
    MatCardModule,
    MatExpansionModule,
    FormsModule,
    NgxScrollTopModule,
    NgxSpinnerModule,
    DatePickerModule,
    MatMenuModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    })
  ],
  providers: [PageService,
    SortService,
    FilterService,
    GroupService,
    EditService,
    ToolbarService, ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
