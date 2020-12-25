import {Component} from '@angular/core';
import {GameModel} from './_models/gameModel';
import {L10n, setCulture} from '@syncfusion/ej2-base';

setCulture('de');


L10n.load({
  de: {
    grid: {
      EmptyRecord: 'Keine Aufzeichnungen angezeigt',
      GroupDropArea: 'Ziehen Sie einen Spaltenkopf hier, um die Gruppe ihre Spalte',
      UnGroup: 'Klicken Sie hier, um die Gruppierung aufheben',
      EmptyDataSourceError: 'DataSource darf bei der Erstauslastung nicht leer sein, da Spalten aus der dataSource im AutoGenerate Spaltenraster',
      Item: 'Artikel',
      Items: 'Artikel',
      Add: 'Hinzufügen',
      Edit: 'Bearbeiten',
      Delete: 'Löschen',
      Cancel: 'Abbrechen',
      Update: 'Speichern'
    },
    pager: {
      currentPageInfo: '{0} von {1} Seiten',
      totalItemsInfo: '({0} Beiträge)',
      firstPageTooltip: 'Zur ersten Seite',
      lastPageTooltip: 'Zur letzten Seite',
      nextPageTooltip: 'Zur nächsten Seite',
      previousPageTooltip: 'Zurück zur letzten Seit',
      nextPagerTooltip: 'Zum nächsten Pager',
      previousPagerTooltip: 'Zum vorherigen Pager'
    },
    datepicker: {
      // placeholder: 'Wählen Sie ein Datum aus',
       today: 'heute'
    }
  }
 });

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GameInventory';
  games: GameModel;
}
