import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PlattformModel} from '../_models/plattformModel';

@Injectable({
  providedIn: 'root'
})
export class PlattformService {

  private readonly baseUrl = environment.API_URL + 'Plattform/';

  constructor(private http: HttpClient) { }

  getPlattforms(): Observable<PlattformModel[]> {
    return this.http.get<PlattformModel[]>(this.baseUrl);
  }

  getPlatfformByName(plattformName: string): Observable<PlattformModel> {
    return this.http.get<PlattformModel>(this.baseUrl + 'Name/' + plattformName);
  }

  getPlattformById(plattformId: number): Observable<PlattformModel> {
    return this.http.get<PlattformModel>(this.baseUrl + plattformId);
  }

  updatePlattform(plattformId: number, plattform: PlattformModel): Observable<PlattformModel> {
    return this.http.put<PlattformModel>(this.baseUrl + plattformId, plattform);
  }

  insertPlattform(plattform: PlattformModel): Observable<PlattformModel> {
    return this.http.post<PlattformModel>(this.baseUrl, plattform);
  }

  deletePlattform(plattformId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl + plattformId);
  }
}
