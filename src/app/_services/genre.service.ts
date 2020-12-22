import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {GenreModel} from '../_models/genreModel';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private readonly BaseUrl = environment.API_URL + 'Genre/';

  constructor(private http: HttpClient) { }

  getGenres(): Observable<GenreModel[]> {
    return this.http.get<GenreModel[]>(this.BaseUrl);
  }

  getGenreById(genreId: number): Observable<GenreModel> {
    return this.http.get<GenreModel>(this.BaseUrl + genreId);
  }

  updateGenre(genreId: number, genre: GenreModel): Observable<GenreModel> {
    return this.http.put<GenreModel>(this.BaseUrl + genreId, genre);
  }

  insertGenre(genre: GenreModel): Observable<GenreModel> {
    return this.http.post<GenreModel>(this.BaseUrl, genre);
  }

  deleteGenre(genreId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.BaseUrl + genreId);
  }
}
