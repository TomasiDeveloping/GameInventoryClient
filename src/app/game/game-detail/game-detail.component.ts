import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {GameService} from '../../_services/game.service';
import {GameModel} from '../../_models/gameModel';
import {Router} from '@angular/router';
import {GameEditComponent} from '../game-edit/game-edit.component';
import Swal from 'sweetalert2';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';

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
              private router: Router,
              private dialog: MatDialog,
              private spinnerService: NgxSpinnerService,
              private toastr: ToastrService,
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

  onCloseClick(reload: boolean): void {
    this.dialogRef.close(reload);
  }

  // if you click on a genre you will be redirected to the genre page with the genre you clicked on
  onGenre(genre: string): void {
    this.router.navigate(['genre/', genre]).then(() => this.onCloseClick(false));
  }

  // if you click on a publisher, you will be redirected to the publisher page with the publisher you clicked on.
  onPublisher(publisherName: string): void {
    this.router.navigate(['publisher/', publisherName]).then(() => this.onCloseClick(false));
  }

  // if a console has been clicked on, the console page is redirected to the clicked console
  onPlattform(plattformName: string): void {
    this.router.navigate(['konsolen/', decodeURI(plattformName)]).then(() => this.onCloseClick(false));
  }

  onUpdate(currentGame: GameModel): void {
    const dialogRef = this.dialog.open(GameEditComponent, {
      width: '60%',
      data: currentGame
    });
    dialogRef.afterClosed().subscribe(
      reload => {
        if (reload) {
          this.onCloseClick(true);
        }
      }
    );
  }

  onDelete(currentGame: GameModel): void {
    Swal.fire({
      title: currentGame.name + ' löschen ?',
      text: 'Game ' + currentGame.name + ' wirklich löschen ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Abbrechen',
      confirmButtonText: 'Ja löschen'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteGame(currentGame.gameId);
      }
    });
  }

  deleteGame(gameId: number): void {
    this.spinnerService.show();
    this.gameService.deleteGame(gameId).subscribe(
      (response) => {
        if (response) {
          this.spinnerService.hide();
          this.onCloseClick(true);
          this.toastr.success('Game erfolgreich gelöscht');
        }
      }, error => {
        this.spinnerService.hide();
        this.onCloseClick(false);
        this.toastr.error(error.error.message);
      }
    );
  }
}
