import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GameService} from '../../_services/game.service';
import {GameModel} from '../../_models/gameModel';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  currentGameId: number;
  currentGame: GameModel;

  constructor(public dialogRef: MatDialogRef<GameDetailComponent>,
              private gameService: GameService,
              @Inject(MAT_DIALOG_DATA)public data: any) {
    this.currentGameId = data;
  }

  ngOnInit(): void {
    this.getGameByGameId();
  }

  getGameByGameId(): void {
    this.gameService.getGameByGameId(this.currentGameId).subscribe(
      (response) => {
        this.currentGame = response;
      }
    );
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}