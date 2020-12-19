import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GameModeModel} from '../_models/gameModeModel';

@Injectable({
  providedIn: 'root'
})
export class GamemodeService {

  private readonly BaseUrl = environment.API_URL + 'GameMode/';

  constructor(private http: HttpClient) { }

  getGameModes(): Observable<GameModeModel[]> {
    return this.http.get<GameModeModel[]>(this.BaseUrl);
  }
}
