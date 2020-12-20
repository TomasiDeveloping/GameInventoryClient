import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DisplayGame, GameModel, GameParams} from '../_models/gameModel';
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

  getDisplayGames(): Observable<DisplayGame[]> {
    return this.http.get<DisplayGame[]>(this.BaseUrl + '/GameDto');
  }

  getDisplayGamesByParams(gameParams: GameParams): Observable<DisplayGame[]> {
    let params = new HttpParams();
    params = params.append('PlattformId', gameParams.plattformId.toString());
    params = params.append('GenreId', gameParams.genreId.toString());
    params = params.append('GameModeId', gameParams.gameModeId.toString());
    return this.http.get<DisplayGame[]>(this.BaseUrl + '/ByParams', {params});
  }

  getGameByGameId(gameId: number): Observable<GameModel> {
    return this.http.get<GameModel>(this.BaseUrl + gameId);
  }
}

