import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {PublisherModels} from '../_models/publisherModels';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  private readonly BaseUrl = environment.API_URL + 'Publisher/';

  constructor(private http: HttpClient) { }

  getPublishers(): Observable<PublisherModels[]> {
    return this.http.get<PublisherModels[]>(this.BaseUrl);
  }

  getPublisherByName(publisherName: string): Observable<PublisherModels> {
    return this.http.get<PublisherModels>(this.BaseUrl + 'Name/' + publisherName);
  }

  insertPublisher(publisher: PublisherModels): Observable<PublisherModels> {
    return this.http.post<PublisherModels>(this.BaseUrl, publisher);
  }

  updatePublisher(publisherId: number, publisher: PublisherModels): Observable<PublisherModels> {
    return this.http.put<PublisherModels>(this.BaseUrl + publisherId, publisher);
  }

  deletePublisher(publisherId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.BaseUrl + publisherId);
  }
}
