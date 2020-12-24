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
    console.log(this.editForm);
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
}
