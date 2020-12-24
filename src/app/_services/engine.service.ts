import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {GameEngineModel} from '../_models/gameEngineModel';

@Injectable({
  providedIn: 'root'
})
export class EngineService {

  private readonly BaseUrl = environment.API_URL + 'Engine/';

  constructor(private http: HttpClient) { }

  getEngines(): Observable<GameEngineModel[]> {
    return this.http.get<GameEngineModel[]>(this.BaseUrl);
  }
}
