import {Component} from '@angular/core';
import {GameModel} from './_models/gameModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GameInventory';
  games: GameModel;
}
