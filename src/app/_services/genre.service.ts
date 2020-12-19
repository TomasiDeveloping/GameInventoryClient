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
}
