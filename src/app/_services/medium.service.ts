import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {MediumModel} from '../_models/mediumModel';

@Injectable({
  providedIn: 'root'
})
export class MediumService {

  private readonly baseUrl = environment.API_URL + 'Medium/';

  constructor(private http: HttpClient) { }

  getMediums(): Observable<MediumModel[]> {
    return this.http.get<MediumModel[]>(this.baseUrl);
  }

  updateMedium(mediumId: number, medium: MediumModel): Observable<MediumModel> {
    return this.http.put<MediumModel>(this.baseUrl + mediumId, medium);
  }

  insertMedium(medium: MediumModel): Observable<MediumModel> {
    return this.http.post<MediumModel>(this.baseUrl, medium);
  }

  deleteMedium(mediumId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl + mediumId);
  }
}
