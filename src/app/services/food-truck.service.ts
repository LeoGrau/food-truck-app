import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, retry, throwError } from "rxjs";

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FoodTruckService {
  port = 3000
  baseUrl = `http://localhost:${this.port}/food-trucks`

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`An error ocurred: ${error.error.message}`);
    } else {
      console.error(
        `Backend return code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError(() => new Error(`Something happened with request, please try again later`));
  }

  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<Object>(this.baseUrl, this.httpOptions).
      pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getById(id: number) {
    return this.http.get<Object>(`${this.baseUrl}/${id}`, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError));;
  }

  update(id: number, item: any) {
    return this.http.put<Object>(`${this.baseUrl}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));;
  }

  delete(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
  create(item: any) {
    return this.http.post<Object>(this.baseUrl, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }
}
