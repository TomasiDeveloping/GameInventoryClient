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

  getPlatfformByName(plattformName: string): Observable<PlattformModel> {
    return this.http.get<PlattformModel>(this.BaseUrl + 'Name/' + plattformName);
  }

  getPlattformById(plattformId: number): Observable<PlattformModel> {
    return this.http.get<PlattformModel>(this.BaseUrl + plattformId);
  }

  updatePlattform(plattformId: number, plattform: PlattformModel): Observable<PlattformModel> {
    return this.http.put<PlattformModel>(this.BaseUrl + plattformId, plattform);
  }

  insertPlattform(plattform: PlattformModel): Observable<PlattformModel> {
    return this.http.post<PlattformModel>(this.BaseUrl, plattform);
  }

  deletePlattform(plattformId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.BaseUrl + plattformId);
  }
}
