import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GameModeModel} from '../_models/gameModeModel';

@Injectable({
  providedIn: 'root'
})
export class GamemodeService {

  private readonly baseUrl = environment.API_URL + 'GameMode/';

  constructor(private http: HttpClient) { }

  getGameModes(): Observable<GameModeModel[]> {
    return this.http.get<GameModeModel[]>(this.baseUrl);
  }

  updateGameMode(gameModeId: number, gameMode: GameModeModel): Observable<GameModeModel> {
    return this.http.put<GameModeModel>(this.baseUrl + gameModeId, gameMode);
  }

  insertGameMode(gameMode: GameModeModel): Observable<GameModeModel> {
    return this.http.post<GameModeModel>(this.baseUrl, gameMode);
  }

  deleteGameMode(gameModeId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl + gameModeId);
  }
}
