import {Component, OnInit, ViewChild} from '@angular/core';
import {MediumService} from '../../_services/medium.service';
import {EngineService} from '../../_services/engine.service';
import {MediumModel} from '../../_models/mediumModel';
import {GameEngineModel} from '../../_models/gameEngineModel';
import {GridComponent} from '@syncfusion/ej2-angular-grids';
import Swal from 'sweetalert2';
import {MatDialog} from '@angular/material/dialog';
import {EngineEditComponent} from '../engine-edit/engine-edit.component';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {MediumEditComponent} from '../medium-edit/medium-edit.component';
import {GamemodeService} from '../../_services/gamemode.service';
import {GameModeModel} from '../../_models/gameModeModel';
import {GameModeEditComponent} from '../game-mode-edit/game-mode-edit.component';

@Component({
  selector: 'app-settings-home',
  templateUrl: './settings-home.component.html',
  styleUrls: ['./settings-home.component.css']
})
export class SettingsHomeComponent implements OnInit {

  @ViewChild('engineGrid', {static: true}) public engineGrid: GridComponent;
  @ViewChild('mediumGrid', {static: true}) public mediumGrid: GridComponent;
  @ViewChild('gameModeGrid', {static: true}) public gameModeGrid: GridComponent;
  mediums: MediumModel[];
  engines: GameEngineModel[];
  gameModes: GameModeModel[];

  constructor(private mediumService: MediumService,
              private engineService: EngineService,
              private gameModeService: GamemodeService,
              private dialog: MatDialog,
              private spinnerService: NgxSpinnerService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getEngines();
    this.getMediums();
    this.getGameModes();
  }

  getMediums(): void {
    this.mediumService.getMediums().subscribe(
      (response) => {
        this.mediums = response;
        this.initMediumGrid();
      }
    );
  }

  getEngines(): void {
    this.engineService.getEngines().subscribe(
      (response) => {
        this.engines = response;
        this.initEngineGrid();
      }
    );
  }

  getGameModes(): void {
    this.gameModeService.getGameModes().subscribe(
      (response) => {
        this.gameModes = response;
        this.initGameModeGrid();
      }
    );
  }

  initEngineGrid(): void {
    this.engineGrid.allowPaging = true;
    this.engineGrid.pageSettings = {pageSize: 10};
    this.engineGrid.toolbar = ['Add', 'Search'];
    this.engineGrid.editSettings = {allowAdding: true, mode: 'Normal'};
  }

  initMediumGrid(): void {
    this.mediumGrid.allowPaging = true;
    this.mediumGrid.pageSettings = { pageSize: 10 };
    this.mediumGrid.toolbar = ['Add', 'Search'];
    this.mediumGrid.editSettings = {allowAdding: true, mode: 'Normal'};
  }

  initGameModeGrid(): void {
    this.gameModeGrid.allowPaging = true;
    this.gameModeGrid.pageSettings = { pageSize: 10 };
    this.gameModeGrid.toolbar = ['Add', 'Search'];
    this.gameModeGrid.editSettings = { allowAdding: true, mode: 'Normal'};
  }

  onEngineEdit(engine: GameEngineModel): void {
    const dialogRef = this.dialog.open(EngineEditComponent, {
      width: '60%',
      data: engine
    });
    dialogRef.afterClosed().subscribe(
      reload => {
        if (reload) {
          this.getEngines();
        }
      }
    );
  }

  engineGridActions(args): void {
    args.cancel = true;
    if (args.item.properties.text === 'Hinzufügen') {
      // tslint:disable-next-line:new-parens
      const engine: GameEngineModel = new class implements GameEngineModel {
        gameEngineId = 0;
        name = '';
      };
      const dialogRef = this.dialog.open(EngineEditComponent, {
        width: '60%',
        data: engine
      });
      dialogRef.afterClosed().subscribe(
        reload => {
          if (reload) {
            this.getEngines();
          }
        }
      );
    } else {
      return;
    }
  }

  mediumGridActions(args): void {
    args.cancel = true;
    if (args.item.properties.text === 'Hinzufügen') {
      // tslint:disable-next-line:new-parens
      const medium: MediumModel = new class implements MediumModel {
        mediumId = 0;
        name = '';
      };
      const dialogRef = this.dialog.open(MediumEditComponent, {
        width: '60%',
        data: medium
      });
      dialogRef.afterClosed().subscribe(
        reload => {
          if (reload) {
            this.getMediums();
          }
        }
      );
    } else {
      return;
    }
  }

  gameModeGridActions(args): void {
    args.cancel = true;
    if (args.item.properties.text === 'Hinzufügen') {
      // tslint:disable-next-line:new-parens
      const gameMode: GameModeModel = new class implements GameModeModel {
        gameModeId = 0;
        name = '';
      };
      const dialogRef = this.dialog.open(GameModeEditComponent, {
        width: '60%',
        data: gameMode
      });
      dialogRef.afterClosed().subscribe(
        reload => {
          if (reload) {
            this.getGameModes();
          }
        }
      );
    }
  }

  onEngineDelete(data: GameEngineModel): void {
    Swal.fire({
      title: data.name + ' löschen ?',
      text: 'Engine ' + data.name + ' wirklich löschen ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Abbrechen',
      confirmButtonText: 'Ja löschen'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteEngine(data.gameEngineId);
      }
    });
  }

  onMediumEdit(medium: MediumModel): void {
    const dialogRef = this.dialog.open(MediumEditComponent, {
      width: '60%',
      data: medium
    });
    dialogRef.afterClosed().subscribe(
      reload => {
        if (reload) {
          this.getMediums();
        }
      }
    );
  }

  onMediumDelete(data: MediumModel): void {
    Swal.fire({
      title: data.name + ' löschen ?',
      text: 'Medium ' + data.name + ' wirklich löschen ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Abbrechen',
      confirmButtonText: 'Ja löschen'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteMedium(data.mediumId);
      }
    });
  }

  deleteEngine(engineId: number): void {
    this.spinnerService.show();
    this.engineService.deleteEngine(engineId).subscribe(
      (response) => {
        if (response) {
          this.spinnerService.hide();
          this.getEngines();
          this.toastr.success('Game engine erfolgreich gelöscht');
        }
      }, error => {
        this.spinnerService.hide();
        this.toastr.error(error.error.message);
      }
    );
  }

  deleteMedium(mediumId: number): void {
    this.spinnerService.show();
    this.mediumService.deleteMedium(mediumId).subscribe(
      (response) => {
        if (response) {
          this.spinnerService.hide();
          this.getMediums();
          this.toastr.success('Medium erfolgreich gelöscht');
        }
      }, error => {
        this.spinnerService.hide();
        this.toastr.error(error.error.message);
      }
    );
  }


  onGameModeEdit(gameMode: GameModeModel): void {
    const dialogRef = this.dialog.open(GameModeEditComponent, {
      width: '60%',
      data: gameMode
    });
    dialogRef.afterClosed().subscribe(
      reload => {
        if (reload) {
          this.getGameModes();
        }
      }
    );
  }

  onGameModeDelete(data: any): void {
    Swal.fire({
      title: data.name + ' löschen ?',
      text: 'Game Mode ' + data.name + ' wirklich löschen ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Abbrechen',
      confirmButtonText: 'Ja löschen'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteGameMode(data.gameModeId);
      }
    });
  }

  deleteGameMode(gameModeId): void {
    this.spinnerService.show();
    this.gameModeService.deleteGameMode(gameModeId).subscribe(
      (response) => {
        if (response) {
          this.spinnerService.hide();
          this.getGameModes();
          this.toastr.success('Game Mode erfolgreich gelöscht');
        }
      }, error => {
        this.spinnerService.hide();
        this.toastr.error(error.error.message);
      }
    );
  }
}
