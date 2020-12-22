import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GenreModel} from '../../_models/genreModel';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {GenreService} from '../../_services/genre.service';

@Component({
  selector: 'app-genre-edit',
  templateUrl: './genre-edit.component.html',
  styleUrls: ['./genre-edit.component.css']
})
export class GenreEditComponent implements OnInit {

  @ViewChild('editForm') editForm: NgForm;
  currentGenre: GenreModel;
  constructor(public dialogRef: MatDialogRef<GenreEditComponent>,
              @Inject(MAT_DIALOG_DATA)public data: any,
              private toastr: ToastrService,
              private genreService: GenreService,
              private spinnerServive: NgxSpinnerService) {
    this.currentGenre = data;
  }

  ngOnInit(): void {
  }

  onCloseDialog(reload: boolean): void {
    this.dialogRef.close(reload);
  }

  onUpdateGenre(): void {
    this.currentGenre.name = this.editForm.value.name;
    this.currentGenre.description = this.editForm.value.description;

    if (this.currentGenre.genreId > 0) {
      this.updateGenre(this.currentGenre);
    } else {
      this.insertGenre(this.currentGenre);
    }
  }

  insertGenre(genre: GenreModel): void {
    this.spinnerServive.show();
    this.genreService.insertGenre(genre).subscribe(
      (response) => {
        this.spinnerServive.hide();
        this.onCloseDialog(true);
        this.toastr.success('Genre: ' + response.name + ' erfolgreich hinzugefügt');
      }, error => {
        this.spinnerServive.hide();
        this.onCloseDialog(false);
        this.toastr.error(error.error.message);
      }
    );
  }

  updateGenre(genre: GenreModel): void {
    this.spinnerServive.show();
    this.genreService.updateGenre(genre.genreId, genre).subscribe(
      (response) => {
        this.spinnerServive.hide();
        this.onCloseDialog(false);
        this.toastr.success('Genre ' + response.name + ' erfolgreich geändert');
      }, error => {
        this.spinnerServive.hide();
        this.onCloseDialog(false);
        this.toastr.error(error.error.message);
      }
    );
  }
}
