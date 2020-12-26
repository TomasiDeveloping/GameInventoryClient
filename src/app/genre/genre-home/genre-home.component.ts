import { Component, OnInit } from '@angular/core';
import {GenreService} from '../../_services/genre.service';
import {GenreModel} from '../../_models/genreModel';
import {MatDialog} from '@angular/material/dialog';
import {GenreEditComponent} from '../genre-edit/genre-edit.component';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-genre-home',
  templateUrl: './genre-home.component.html',
  styleUrls: ['./genre-home.component.css']
})
export class GenreHomeComponent implements OnInit {

  genres: GenreModel[];
  genre: GenreModel;

  constructor(private genreService: GenreService,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private spinnerService: NgxSpinnerService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    // checks if a genre was called via the params
    const genre = this.route.snapshot.paramMap.get('genre');
    // if only one genre was called, only this one will be loaded from the db by name, otherwise all will be loaded
    if (genre) {
      this.getGenreByName(genre);
    } else {
      this.getGenres();
    }
  }

  getGenres(): void {
    this.genreService.getGenres().subscribe(
      (response) => {
        this.genres = response;
      }
    );
  }

  getGenreByName(genreName: string): void {
    this.spinnerService.show();
    this.genreService.getGenreByName(genreName).subscribe(
      (response) => {
        this.genre = response;
        this.spinnerService.hide();
      }, error => {
        this.spinnerService.hide();
        this.toastr.error(error.error.message);
      }
    );
  }

  onGenreEdit(genre: GenreModel): void {
    const dialogRef = this.dialog.open(GenreEditComponent, {
      width: '60%',
      data: genre
    });
    dialogRef.afterClosed().subscribe(
      reload => {
        if (reload) {
          this.getGenres();
        }
      }
    );
  }

  onNewGenre(): void {
    let genre: GenreModel;
    // tslint:disable-next-line:new-parens
    genre = new class implements GenreModel {
      description = '';
      genreId = 0;
      name = '';
    };
    this.onGenreEdit(genre);
  }

  onDelete(genre: GenreModel): void {
    Swal.fire({
      title: genre.name + ' löschen ?',
      text: 'Genre ' + genre.name + ' wirklich löschen ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Abbrechen',
      confirmButtonText: 'Ja löschen'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteGenre(genre.genreId);
      }
    });
  }

  deleteGenre(genreId: number): void {
    this.spinnerService.show();
    this.genreService.deleteGenre(genreId).subscribe(
      (response) => {
        if (response) {
          this.spinnerService.hide();
          this.getGenres();
          this.toastr.success('Genre erfolgreich gelöscht');
        }
      }, error => {
        this.spinnerService.hide();
        this.toastr.error(error.error.message);
      }
    );
  }
}
