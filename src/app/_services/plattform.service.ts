import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PlattformModel} from '../_models/plattformModel';

@Injectable({
  providedIn: 'root'
})
export class PlattformService {

  private readonly BaseUrl = environment.API_URL + 'Plattform/';

  constructor(private http: HttpClient) { }

  getPlattforms(): Observable<PlattformModel[]> {
    return this.http.get<PlattformModel[]>(this.BaseUrl);
  }

  getPlattformById(plattformId: number): Observable<PlattformModel> {
    return this.http.get<PlattformModel>(this.BaseUrl + plattformId);
  }
}
