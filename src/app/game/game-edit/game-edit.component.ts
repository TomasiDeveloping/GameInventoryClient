import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {GameModel} from '../../_models/gameModel';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css']
})
export class GameEditComponent implements OnInit {

  @ViewChild('editForm') editForm: NgForm;
  currentGame: GameModel;

  constructor(private dialogRef: MatDialogRef<GameEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.currentGame = data;
  }

  ngOnInit(): void {
  }

  onCloseDialog(reload: boolean): void {
    this.dialogRef.close();
  }

  onUpdateGame(): void {

  }
}
