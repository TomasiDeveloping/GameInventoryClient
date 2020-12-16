import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GameModel} from '../_models/gameModel';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly BaseUrl = environment.API_URL + 'Game/';

  constructor(private http: HttpClient) { }

  getGames(): Observable<GameModel[]> {
    return this.http.get<GameModel[]>(this.BaseUrl);
  }

  getGamesById(gameId: number): Observable<GameModel> {
    return this.http.get<GameModel>(this.BaseUrl + gameId);
  }
}
