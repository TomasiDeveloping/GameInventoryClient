import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {GameEngineModel} from '../_models/gameEngineModel';

@Injectable({
  providedIn: 'root'
})
export class EngineService {

  private readonly baseUrl = environment.API_URL + 'Engine/';

  constructor(private http: HttpClient) { }

  getEngines(): Observable<GameEngineModel[]> {
    return this.http.get<GameEngineModel[]>(this.baseUrl);
  }

  updateEngine(engineId: number, engine: GameEngineModel): Observable<GameEngineModel> {
    return this.http.put<GameEngineModel>(this.baseUrl + engineId, engine);
  }

  insertEngine(engine: GameEngineModel): Observable<GameEngineModel> {
    return this.http.post<GameEngineModel>(this.baseUrl, engine);
  }

  deleteEngine(engineId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl + engineId);
  }
}
