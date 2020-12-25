import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {PublisherModels} from '../_models/publisherModels';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  private readonly baseUrl = environment.API_URL + 'Publisher/';

  constructor(private http: HttpClient) { }

  getPublishers(): Observable<PublisherModels[]> {
    return this.http.get<PublisherModels[]>(this.baseUrl);
  }

  getPublisherByName(publisherName: string): Observable<PublisherModels> {
    return this.http.get<PublisherModels>(this.baseUrl + 'Name/' + publisherName);
  }

  insertPublisher(publisher: PublisherModels): Observable<PublisherModels> {
    return this.http.post<PublisherModels>(this.baseUrl, publisher);
  }

  updatePublisher(publisherId: number, publisher: PublisherModels): Observable<PublisherModels> {
    return this.http.put<PublisherModels>(this.baseUrl + publisherId, publisher);
  }

  deletePublisher(publisherId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.baseUrl + publisherId);
  }
}
