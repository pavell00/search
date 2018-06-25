import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';

@Injectable()
export class DataService {

  dataUrl = 'assets/generated.json';

  constructor(private http: HttpClient) { }

  getConfig() {
    return this.http.get<Employee[]>(this.dataUrl);
  }
}