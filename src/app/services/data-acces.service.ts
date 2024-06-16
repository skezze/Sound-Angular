import { Injectable } from '@angular/core';
import { Configuration } from '../configuration/configuration';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sound } from '../models/Sound';

@Injectable({
  providedIn: 'root'
})
export class DataAccesService {

  private apiUrl = Configuration.apiUrl +'/sounds'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  getSounds(): Observable<Sound[]> {
    return this.http.get<Sound[]>(this.apiUrl);
  }

}
