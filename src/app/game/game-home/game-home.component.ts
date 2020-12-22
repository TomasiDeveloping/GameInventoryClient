import {Component, OnInit} from '@angular/core';
import {GenreModel} from '../../_models/genreModel';
import {GenreService} from '../../_services/genre.service';
import {PlattformService} from '../../_services/plattform.service';
import {PlattformModel} from '../../_models/plattformModel';
import {GamemodeService} from '../../_services/gamemode.service';
import {GameModeModel} from '../../_models/gameModeModel';
import {DisplayGame, GameParams} from '../../_models/gameModel';
import {GameService} from '../../_services/game.service';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {MatSelectChange} from '@angular/material/select';
import {MatRadioChange} from '@angular/material/radio';
import {MatDialog} from '@angular/material/dialog';
import {GameDetailComponent} from '../game-detail/game-detail.component';
import {NgxSpinnerService} from 'ngx-spinner';

class PageSettingsModel {
}

@Component({
  selector: 'app-game-home',
  templateUrl: './game-home.component.html',
  styleUrls: ['./game-home.component.css']
})
export class GameHomeComponent implements OnInit {

  pageSetting: PageSettingsModel;

  genres: GenreModel[];
  plattforms: PlattformModel[];
  gameModes: GameModeModel[];

  displayGames: DisplayGame[];
  gameParams: GameParams;

  filterDisplayGames: DisplayGame[];
  filterCacheGames: DisplayGame[];

  value = '';
  myControl = new FormControl();
  filteredOptions: Observable<DisplayGame[]>;

  constructor(private genreService: GenreService,
              private plattfoemService: PlattformService,
              private gameModeService: GamemodeService,
              private gameService: GameService,
              public dialog: MatDialog,
              private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.pageSetting = { pageSize: 10 };
    // tslint:disable-next-line:new-parens
    this.gameParams = new class implements GameParams {
      gameModeId = 0;
      genreId = 0;
      plattformId = 0;
    };

    this.getDisplayGames();
    this.getGenres();
    this.getPlattforms();
    this.getGameModes();
  }

  initAutoComplete(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.filterDisplayGames.slice())
      );
  }

  displayFn(game: DisplayGame): string {
    return game && game.gameName ? game.gameName : '';
  }

  private _filter(name: string): DisplayGame[] {
    const filterValue = name.toLowerCase();

    return this.filterDisplayGames.filter(option => option.gameName.toLowerCase().indexOf(filterValue) === 0);
  }
  getGenres(): void {
    this.genreService.getGenres().subscribe(
      (response) => {
        response.unshift({genreId: 0, name: 'Alle', description: ''});
        this.genres = response;
      }
    );
  }

  getPlattforms(): void {
    this.plattfoemService.getPlattforms().subscribe(
      (response) => {
        response.unshift({plattformId: 0, name: 'Alle', description: '', producer: '', photoUrl: '', release: new Date()});
        this.plattforms = response;
      }
    );
  }

  getGameModes(): void {
    this.gameModeService.getGameModes().subscribe(
      (response) => {
        response.unshift({gameModeId: 0, name: 'Alle'});
        this.gameModes = response;
      }
    );
  }

  getDisplayGames(): void {
    this.spinnerService.show();
    this.gameService.getDisplayGames().subscribe(
      (response) => {
        this.displayGames = response;
        this.filterDisplayGames = response;
        this.filterCacheGames = response;
        this.initAutoComplete();
        this.spinnerService.hide();
      }
    );
  }
  getGamesByParams(): void {
    if (this.gameParams.plattformId === 0 && this.gameParams.genreId === 0 && this.gameParams.gameModeId === 0) {
      this.filterDisplayGames = this.displayGames;
      this.filterCacheGames = this.displayGames;
      this.initAutoComplete();
    } else {
      this.gameService.getDisplayGamesByParams(this.gameParams).subscribe(
        (response) => {
          this.filterDisplayGames = response;
          this.filterCacheGames = response;
          this.initAutoComplete();
        }
      );
    }
  }

  onGameChange(event: DisplayGame): void {
    if (!event.gameId || !event) {
      this.filterDisplayGames = this.filterCacheGames;
      return;
    }
    this.filterDisplayGames = this.filterDisplayGames.filter(x => x.gameId === event.gameId);
  }

  onConsoleChange(event: MatSelectChange): void {
    this.gameParams.plattformId = event.value;
    this.getGamesByParams();
  }

  onGenreChange(event: MatSelectChange): void {
    this.gameParams.genreId = event.value;
    this.getGamesByParams();
  }

  onGameModeChange(event: MatRadioChange): void {
    this.gameParams.gameModeId = event.value;
    this.getGamesByParams();
  }

  onGameClick(event: any): void {
    this.dialog.open(GameDetailComponent, {
      width: '90%',
      height: 'auto',
      data: event.rowData.gameId
    });
    console.log(event.rowData.gameId);
  }
}
