import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Employee } from './employee';

import {Observable} from 'rxjs';
import { pipe} from 'rxjs';
import { BehaviorSubject, Subject} from "rxjs";
//import "rxjs/add/operator/combineLatest";

@Injectable()
export class DataService {

  dataUrl = 'assets/generated.json';

  constructor(private http: HttpClient) { }

  getConfig(): Observable<Employee[]> {
    //return this.http.get<Employee[]>(this.dataUrl);
    return this.http.get<Employee[]>(this.dataUrl)
      .pipe(
       
      )
  }
}