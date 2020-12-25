import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {GameModeModel} from '../../_models/gameModeModel';
import {GamemodeService} from '../../_services/gamemode.service';

@Component({
  selector: 'app-game-mode-edit',
  templateUrl: './game-mode-edit.component.html',
  styleUrls: ['./game-mode-edit.component.css']
})
export class GameModeEditComponent implements OnInit {

  @ViewChild('editForm') public editForm: NgForm;
  currentGameMode: GameModeModel;

  constructor(private dialogRef: MatDialogRef<GameModeEditComponent>,
              private spinnerService: NgxSpinnerService,
              private toastr: ToastrService,
              private gameModeService: GamemodeService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentGameMode = data;
  }

  ngOnInit(): void {
  }

  onCloseDialog(reload: boolean): void {
    this.dialogRef.close(reload);
  }

  onUpdateGameMode(): void {
    this.currentGameMode.name = this.editForm.value.name;
    if (this.currentGameMode.gameModeId > 0) {
      this.updateGameMode(this.currentGameMode);
    } else {
      this.insertGameMode(this.currentGameMode);
    }
  }

  updateGameMode(gameMode: GameModeModel): void {
    this.spinnerService.show();
    this.gameModeService.updateGameMode(gameMode.gameModeId, gameMode).subscribe(
      (response) => {
        this.spinnerService.hide();
        this.onCloseDialog(true);
        this.toastr.success('Game Mode ' + response.name + ' erfolgreich geändert');
      }, error => {
        this.spinnerService.hide();
        this.onCloseDialog(false);
        this.toastr.error(error.error.message);
      }
    );
  }

  insertGameMode(gameMode: GameModeModel): void {
    this.spinnerService.show();
    this.gameModeService.insertGameMode(gameMode).subscribe(
      (response) => {
        this.spinnerService.hide();
        this.onCloseDialog(true);
        this.toastr.success('Game Mode ' + response.name + ' erfolgreich hinzugefügt');
      }, error => {
        this.spinnerService.hide();
        this.onCloseDialog(false);
        this.toastr.error(error.error.message);
      }
    );
  }
}
