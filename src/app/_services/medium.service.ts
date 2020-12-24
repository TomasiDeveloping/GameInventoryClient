import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {MediumModel} from '../_models/mediumModel';

@Injectable({
  providedIn: 'root'
})
export class MediumService {

  private readonly BaseUrl = environment.API_URL + 'Medium/';

  constructor(private http: HttpClient) { }

  getMediums(): Observable<MediumModel[]> {
    return this.http.get<MediumModel[]>(this.BaseUrl);
  }
}
