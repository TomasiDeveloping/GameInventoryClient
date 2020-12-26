import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {GameModel} from '../../_models/gameModel';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NgForm} from '@angular/forms';
import {GenreModel} from '../../_models/genreModel';
import {GenreService} from '../../_services/genre.service';
import {GamemodeService} from '../../_services/gamemode.service';
import {GameModeModel} from '../../_models/gameModeModel';
import {PlattformService} from '../../_services/plattform.service';
import {PlattformModel} from '../../_models/plattformModel';
import {MediumService} from '../../_services/medium.service';
import {MediumModel} from '../../_models/mediumModel';
import {EngineService} from '../../_services/engine.service';
import {PublisherService} from '../../_services/publisher.service';
import {map} from 'rxjs/operators';
import {forkJoin} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {GameService} from '../../_services/game.service';
import {MatOptionSelectionChange} from '@angular/material/core';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css']
})
export class GameEditComponent implements OnInit {

  @ViewChild('editForm') editForm: NgForm;
  currentGame: GameModel;
  genres: { genreId: number, genreName: string } [] = [];
  gameModes: { gameModeId: number, gameModeName: string } [] = [];
  plattforms: { plattformId: number, plattformName: string } [] = [];
  mediums: { mediumId: number, mediumName: string } [] = [];
  engines: { gameEngineId: number, gameEngineName } [] = [];
  publishers: { publisherId: number, publisherName: string } [] = [];
  ageRating = [0, 3, 6, 7, 12, 16, 18];

  constructor(private dialogRef: MatDialogRef<GameEditComponent>,
              private genreService: GenreService,
              private gameModeService: GamemodeService,
              private plattformService: PlattformService,
              private mediumService: MediumService,
              private engineService: EngineService,
              private publisherService: PublisherService,
              private gameService: GameService,
              private spinnerService: NgxSpinnerService,
              private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentGame = data;
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const genres = this.genreService.getGenres()
      .pipe(
        map((response) => {
          response.forEach((genre) => {
            this.genres.push({genreId: genre.genreId, genreName: genre.name});
          });
        }));
    const gameModes = this.gameModeService.getGameModes()
      .pipe(
        map((response) => {
          response.forEach((mode) => {
            this.gameModes.push({gameModeId: mode.gameModeId, gameModeName: mode.name});
          });
        })
      );
    const plattforms = this.plattformService.getPlattforms()
      .pipe(
        map((response) => {
          response.forEach((plattform) => {
            this.plattforms.push({plattformId: plattform.plattformId, plattformName: plattform.name});
          });
        })
      );
    const mediums = this.mediumService.getMediums()
      .pipe(
        map((response) => {
          response.forEach((medium) => {
            this.mediums.push({mediumId: medium.mediumId, mediumName: medium.name});
          });
        })
      );
    const engines = this.engineService.getEngines()
      .pipe(
        map((response) => {
          response.forEach((engine) => {
            this.engines.push({gameEngineId: engine.gameEngineId, gameEngineName: engine.name});
          });
        })
      );
    const publishers = this.publisherService.getPublishers()
      .pipe(
        map((response) => {
          response.forEach((publisher) => {
            this.publishers.push({publisherId: publisher.publisherId, publisherName: publisher.name});
          });
        })
      );
    forkJoin([genres, gameModes, plattforms, mediums, engines, publishers]).subscribe();
  }

  onCloseDialog(reload: boolean): void {
    this.dialogRef.close(reload);
  }

  onUpdateGame(): void {
    this.currentGame.name = this.editForm.value.name;
    this.currentGame.ageRating = this.editForm.value.ageRating;
    this.currentGame.publisherId = this.editForm.value.publisher;
    this.currentGame.gameEngineId = this.editForm.value.engine;
    this.currentGame.mediums = this.editForm.value.mediums;
    this.currentGame.plattforms = this.editForm.value.plattforms;
    this.currentGame.gameModes = this.editForm.value.gameModes;
    this.currentGame.genres = this.editForm.value.genres;
    this.currentGame.firstPublication = this.editForm.value.firstPublication;
    this.currentGame.information = this.editForm.value.information;
    this.currentGame.coverUrl = this.editForm.value.coverUrl;
    this.currentGame.description = this.editForm.value.description;

    if (this.currentGame.gameId > 0) {
      this.updateGame(this.currentGame);
    } else {
      this.insertGame(this.currentGame);
    }
  }

  insertGame(game: GameModel): void {
    this.spinnerService.show();
    this.gameService.insertGame(game).subscribe(
      (response) => {
        this.spinnerService.hide();
        this.onCloseDialog(true);
        this.toastr.success('Game ' + response.name + ' erfolgreich hinzugefügt');
      }, error => {
        this.spinnerService.hide();
        this.onCloseDialog(false);
        this.toastr.error(error.error.message);
      }
    );
  }

  updateGame(game: GameModel): void {
    this.spinnerService.show();
    this.gameService.updateGame(game.gameId, game).subscribe(
      (response) => {
        this.spinnerService.hide();
        this.onCloseDialog(true);
        this.toastr.success('Game ' + response.name + ' erfolgreich geändert');
      }, error => {
        this.spinnerService.hide();
        this.onCloseDialog(false);
        this.toastr.error(error.error.message);
      }
    );
  }

  genreCompare(item1: GenreModel, item2: GenreModel): boolean {
    return item1 && item2 ? item1.genreId === item2.genreId : item1.genreId === item2.genreId;
  }

  gameModeCompare(item1: GameModeModel, item2: GameModeModel): boolean {
    return item1 && item2 ? item1.gameModeId === item2.gameModeId : item1.gameModeId === item2.gameModeId;
  }

  plattformCompare(item1: PlattformModel, item2: PlattformModel): boolean {
    return item1 && item2 ? item1.plattformId === item2.plattformId : item1.plattformId === item2.plattformId;
  }

  mediumCompare(item1: MediumModel, item2: MediumModel): boolean {
    return item1 && item2 ? item1.mediumId === item2.mediumId : item1.mediumId === item2.mediumId;
  }

  // If the game is in edit mode, a genre is added or removed directly in the DB when you click on it
  onGenresChange(event: MatOptionSelectionChange): void {
    if (this.currentGame.gameId <= 0 || !event.isUserInput) {
      return;
    }
    if (event.source.selected) {
      this.gameService.insertGenresToGame(this.currentGame.gameId, event.source.value.genreId).subscribe(
        (response) => {
          if (!response) {
            this.toastr.error('Genre konnte nicht hinzugefügt werden');
          }
        }
      );
    } else {
      this.gameService.removeGenreFromGame(this.currentGame.gameId, event.source.value.genreId).subscribe(
        (response) => {
          if (!response) {
            this.toastr.error('Genre konnte nicht entfernt werden');
          }
        }
      );
    }
  }

  // If the game is in edit mode, a platform is added or removed directly in the DB when you click on it
  onPlattformChange(event: MatOptionSelectionChange): void {
    if (this.currentGame.gameId <= 0 || !event.isUserInput) {
      return;
    }
    if (event.source.selected) {
      this.gameService.insertPlattformToGame(this.currentGame.gameId, event.source.value.plattformId).subscribe(
        (response) => {
          if (!response) {
            this.toastr.error('Konsole konnte nicht hinzugefügt werden');
          }
        }
      );
    } else {
      this.gameService.removePlattformFromGame(this.currentGame.gameId, event.source.value.plattformId).subscribe(
        (response) => {
          if (!response) {
            this.toastr.error('Konsole konnte nicht entfernt werden');
          }
        }
      );
    }
  }

  // If the game is in edit mode, a gameMode is added or removed directly in the DB when you click on it
  onGameModeChange(event: MatOptionSelectionChange): void {
    if (this.currentGame.gameId <= 0 || !event.isUserInput) {
      return;
    }
    if (event.source.selected) {
      this.gameService.insertGameModeToGame(this.currentGame.gameId, event.source.value.gameModeId).subscribe(
        (response) => {
          if (!response) {
            this.toastr.error('Game Mode konnte nicht hinzugefügt werden');
          }
        }
      );
    } else {
      this.gameService.removeGameModeFromGame(this.currentGame.gameId, event.source.value.gameModeId).subscribe(
        (response) => {
          if (!response) {
            this.toastr.error('Game Mode konnte nicht entfernt werden');
          }
        }
      );
    }
  }

  // If the game is in edit mode, a medium is added or removed directly in the DB when you click on it
  onMediumChange(event: MatOptionSelectionChange): void {
    if (this.currentGame.gameId <= 0 || !event.isUserInput) {
      return;
    }
    if (event.source.selected) {
      this.gameService.insertMediumToGame(this.currentGame.gameId, event.source.value.mediumId).subscribe(
        (response) => {
          if (!response) {
            this.toastr.error('Medium konnte nicht hinzugefügt werden');
          }
        }
      );
    } else {
      this.gameService.removeMediumFromGame(this.currentGame.gameId, event.source.value.mediumId).subscribe(
        (response) => {
          if (!response) {
            this.toastr.error('Medium konnte nicht entfernt werden');
          }
        }
      );
    }
  }
}
