import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DisplayGame, GameModel, GameParams} from '../_models/gameModel';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly baseUrl = environment.API_URL + 'Game/';

  constructor(private http: HttpClient) { }

  // ==============
  // GET METHODS
  // ==============
  getGames(): Observable<GameModel[]> {
    return this.http.get<GameModel[]>(this.baseUrl);
  }

  getDisplayGames(): Observable<DisplayGame[]> {
    return this.http.get<DisplayGame[]>(this.baseUrl + '/GameDto');
  }

  getDisplayGamesByParams(gameParams: GameParams): Observable<DisplayGame[]> {
    let params = new HttpParams();
    params = params.append('PlattformId', gameParams.plattformId.toString());
    params = params.append('GenreId', gameParams.genreId.toString());
    params = params.append('GameModeId', gameParams.gameModeId.toString());
    return this.http.get<DisplayGame[]>(this.baseUrl + '/ByParams', {params});
  }

  getGameByGameId(gameId: number): Observable<GameModel> {
    return this.http.get<GameModel>(this.baseUrl + gameId);
  }

  // ===============
  // UPDATE METHODS
  // ================
  updateGame(gameId: number, game: GameModel): Observable<GameModel> {
    return this.http.put<GameModel>(this.baseUrl + gameId, game);
  }

  // ===============
  // POST METHODS
  // ===============
  insertGame(game: GameModel): Observable<GameModel> {
    return this.http.post<GameModel>(this.baseUrl, game);
  }

  insertPlattformToGame(gameId: number, plattformId: number): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl + gameId + '/AddPlattform', plattformId);
  }

  insertGenresToGame(gameId: number, genreId: number): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl + gameId + '/AddGenre', genreId);
  }

  insertGameModeToGame(gameId: number, gameModeId: number): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl + gameId + '/AddGameMode', gameModeId);
  }

  insertMediumToGame(gameId: number, mediumId: number): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl + gameId + '/AddMedium', mediumId);
  }

  // ===============
  // DELETE METHODS
  // ===============
  removePlattformFromGame(gameId: number, plattformId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl + gameId + '/RemovePlattform/' + plattformId);
  }

  removeGenreFromGame(gameId: number, genreId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl + gameId + '/RemoveGenre/' + genreId);
  }

  removeGameModeFromGame(gameId: number, gameModeId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl + gameId + '/RemoveGameMode/' + gameModeId);
  }

  removeMediumFromGame(gameId: number, mediumId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl + gameId + '/RemoveMedium/' + mediumId);
  }

  deleteGame(gameId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl + gameId);
  }
}

